/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers

import { marked } from 'marked';
import { IRequest, Router } from 'itty-router';

import {
  deleteOne,
  getOne,
  insertOne,
  runQuery,
  runSelect,
  updateOne,
} from './sql';

const router = Router();
export interface Env {
  DB: D1Database;
  ACCESS_TOKEN: string;
}

export interface BlogEntry {
  slug: string;
  title: string;
  link: string;
  md: string;
  html: string;
  tags: string;
  category_slug: string;
  description: string;
  isPublished: boolean;
  image?: string;
}

export interface Query {
  [key: string]: string | number;
}

const jsonResponse = async (data: any) => {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};

const authorization = (request: IRequest, env: Env) => {
  const authorization = request.headers.get('Authorization');
  try {
    const [scheme, encoded] = authorization.split(' ');
    if (!encoded || encoded !== env.ACCESS_TOKEN) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

router.get('/', async (request, env) => {
  const homeData = await getOne('blog', 'hello-world', env);
  return jsonResponse(homeData);
});

router.get('/blog/', async (request, env) => {
  const tableName = 'blog';
  const result = await runSelect({ tableName, env });
  return jsonResponse(result);
});

router.post('/blog', async (request, env) => {
  const isAuthorized = authorization(request, env);
  if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const tableName = 'blog';
  const blogEntry: BlogEntry = await request.json();
  console.log(blogEntry);
  const html = marked.parse(blogEntry.md);
  const link = `/${blogEntry.category_slug}/${blogEntry.slug}`;
  const createdAt = new Date().toISOString();
  const result = await insertOne(
    tableName,
    { ...blogEntry, html, link, createdAt },
    env
  );
  return jsonResponse(result);
});

router.put('/blog/:slug', async (request, env) => {
  const isAuthorized = authorization(request, env);
  if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const { slug } = request.params;
  const tableName = 'blog';
  const blogEntry: BlogEntry = await request.json();
  const html = marked.parse(blogEntry.md);
  const link = `/${blogEntry.category_slug}/${blogEntry.slug}`;
  const updatedAt = " DATETIME('now') ";
  const result = await updateOne(
    tableName,
    slug,
    { ...blogEntry, html, link, updatedAt },
    env
  );
  return jsonResponse(result);
});

router.get('/blog/:slug', async (request, env) => {
  const tableName = 'blog';
  const { slug } = request.params;
  const result = getOne(tableName, slug, env);
  return jsonResponse(result);
});

router.delete('/blog/:slug', async (request, env) => {
  const isAuthorized = authorization(request, env);
  if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const tableName = 'blog';
  const { slug } = request.params;
  const result = await deleteOne(tableName, slug, env);
  return jsonResponse(result);
});

router.get('/query', async (request, env) => {
  const isAuthorized = authorization(request, env);
  if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const { sql } = request.params;
  const result = runQuery(sql, env);
  return jsonResponse(result);
});

// router.get('/blog/:category_slug/', async (request, env) => {
//   const { category_slug } = request.params;
//   const tableName = 'blog';
//   const result = await runSelect({ tableName, { category_slug }, env });
//   return jsonResponse(result);
// });

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
  fetch: router.handle, // yep, it's this easy.
};
