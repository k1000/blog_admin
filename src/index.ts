/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { marked } from 'marked';

export interface Env {
  DB: D1Database;
}

export interface BlogEntry {
  slug: string;
  title: string;
  link: string;
  md: string;
  html: string;
  tags: string[];
  category_slug: string;
  description: string;
}

export interface Query {
  [key: string]: string | number;
}

const insert = async (
  blogEntry: BlogEntry,
  env: Env,
  ctx: ExecutionContext
) => {
  const { DB } = env;
  const { slug, title, md, html, tags, category_slug, description } = blogEntry;
  console.log(blogEntry);
  const result = await DB.prepare(
    `INSERT INTO BlogEntries (slug, title, md, html, tags, category_slug, description) 
							VALUES ("${slug}", "${title}", "${md}", "${html}", "${tags}", "${category_slug}", "${description}")`
  )
    .bind('synopsis')
    .run();
  return new Response(JSON.stringify(result));
};

const jsonResponse = async (data: any) => {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// https://developers.cloudflare.com/d1/get-started/
const insertRow = async (tableName: string, data: BlogEntry, env: Env) => {
  const { DB } = env;
  const keys = Object.keys(data);
  keys.push('createdAt');
  const values = Object.values(data).map((v) =>
    typeof v === 'string' ? `'${v}'` : v
  );
  values.push("date('now')");
  const sql = `INSERT INTO ${tableName} (${keys.join(
    ', '
  )}) VALUES (${values.join(', ')})`;
  return DB.prepare(sql).bind('DB synopsis').all();
};

// wrangler d1 execute DB --local --command="SELECT * FROM BlogEntries WHERE slug = 'hello-world'"
const getOne = async (tableName: string, slug: string, env: Env) => {
  const { DB } = env;
  const sql = `SELECT * FROM ${tableName} WHERE slug = '${slug}'`;
  // console.log(sql);
  return DB.prepare(sql).all();
};

const updateOne = async (
  tableName: string,
  slug: string,
  query: Query,
  env: Env
) => {
  const { DB } = env;
  const q = renderQuery(query);
  const sql = `UPDATE ${tableName}
    SET ${q.join(', ')} 
    WHERE slug = '${slug}'`;
  // console.log(sql);
  return DB.prepare(sql).all();
};

const deleteOne = async (tableName: string, slug: string, env: Env) => {
  const { DB } = env;
  const sql = `DELETE FROM ${tableName} 
    WHERE slug = '${slug}'`;
  // console.log(sql);
  return DB.prepare(sql).all();
};

interface RunQuery {
  tableName: string;
  query?: Record<string, string | number>;
  env: Env;
}

const renderQuery = (query: Record<string, string | number>) => {
  return Object.entries(query).map(
    ([k, v]) => `${k} = ${typeof v === 'string' ? `'${v}'` : v}`
  );
};

const runSelect = async ({ tableName, query = {}, env }: RunQuery) => {
  const { DB } = env;
  const q = renderQuery(query);
  const sql = `SELECT * FROM ${tableName} 
  ${q.length > 0 && `WHERE ${q.join(' AND ')}`}`;
  console.log(sql);
  return DB.prepare(sql).all();
};

const cachePage = async (request: Request, env: Env) => {
  const { pathname } = new URL(request.url);
  // https://developers.cloudflare.com/workers/examples/cache-api/
  const cache = caches.default;
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  const response = await fetch(request);
  const cacheControl = response.headers.get('Cache-Control');
  if (cacheControl && cacheControl.includes('no-store')) {
    return response;
  }
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { pathname } = new URL(request.url);
    const method = request.method;
    const route = pathname.split('/');
    if (route.length < 2) return new Response('No route provided');
    const tableName = route[1];
    console.log(tableName);
    if (method === 'POST') {
      // get POST body
      const blogEntry: BlogEntry = await request.json();
      // check if its POST
      const html = marked.parse(blogEntry.md);
      const link = `/${blogEntry.category_slug}/${blogEntry.slug}`;
      const result = await insertRow(
        tableName,
        { ...blogEntry, html, link },
        env
      );
      return jsonResponse(result);
    } else if (method === 'GET' && route.length === 2) {
      const result = await runSelect({ tableName, env });
      return jsonResponse(result);
    } else if (method === 'GET' && route.length === 3) {
      const slug = route[1];
      const result = getOne(tableName, slug, env);
      return jsonResponse(result);
    } else if (method === 'DELETE' && route.length === 3) {
      const slug = route[1];
      const result = deleteOne(tableName, slug, env);
      return jsonResponse(result);
    } else {
      return new Response('Hello World!');
    }

    return new Response('Hello World!');
  },
};
