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
import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';
import { Layout } from './components/Layout';
import { jsx, JSXNode, memo } from 'hono/jsx';

import {
  deleteOne,
  getOne,
  insertOne,
  runQuery,
  runSelect,
  updateOne,
} from './sql';
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react';

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

// https://honojs.dev/docs/getting-started/cloudflare-workers/
const app = new Hono<{ Bindings: Env }>();

const tableName = 'blog';

// const authorization = (request: IRequest, env: Env) => {
//   const authorization = request.headers.get('Authorization');
//   try {
//     const [scheme, encoded] = authorization.split(' ');
//     if (!encoded || encoded !== env.ACCESS_TOKEN) {
//       return false;
//     }
//   } catch (e) {
//     return false;
//   }
//   return true;
// };

// app.get('/', async ({ env, json }) => {
//   const homeData = await getOne('blog', 'hello-world', env);
//   return json(homeData);
// });

const Top = (props: { entries?: BlogEntry[] }) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>{props.entries && props.entries.map((m) => <li>{m.title}</li>)}</ul>
    </Layout>
  );
};

app.get('/', async ({ env, html }) => {
  const homeData = await getOne('blog', 'hello-world', env);
  const messages = ['Good Morning', 'Good Evening', 'Good Night'];
  const { results } = (await runSelect({
    tableName,
    env,
    query: {},
  })) as D1Result<BlogEntry>;
  return html((<Top entries={results} />) as unknown as string);
});

app.get('/blog/', async ({ req, env, json }) => {
  // const isAuthorized = authorization(req, env);
  // const query = !isAuthorized
  //   ? ({ isPublished: 1 } as unknown as BlogEntry)
  //   : {};
  const result = await runSelect({ tableName, env, query: {} });
  return json(result);
});

app.post('/blog', async ({ req, env, json }) => {
  // const isAuthorized = authorization(req, env);
  // if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const blogEntry: BlogEntry = await req.json();
  const html = marked.parse(blogEntry.md);
  const link = `/${blogEntry.category_slug}/${blogEntry.slug}`;
  const createdAt = "datetime('now')";
  const result = await insertOne(
    tableName,
    { ...blogEntry, html, link, createdAt },
    env
  );
  return json(result);
});

app.put('/blog/:slug', async ({ req, env, json }) => {
  // const isAuthorized = authorization(req, env);
  // if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const slug = req.param('slug');
  const blogEntry: BlogEntry = await req.json();
  if ('md' in blogEntry) {
    blogEntry.html = marked.parse(blogEntry.md);
  }
  if ('category_slug' in blogEntry) {
    blogEntry.link = `/${blogEntry.category_slug}/${blogEntry.slug ?? slug}`;
  }
  const updatedAt = "datetime('now')";
  const result = await updateOne(
    tableName,
    slug,
    { ...blogEntry, updatedAt },
    env
  );
  return json(result);
});

app.get('/blog/:slug', async ({ req, env, json }) => {
  const slug = req.param('slug');
  const result = await getOne(tableName, slug, env);
  return json(result);
});

app.delete('/blog/:slug', async ({ req, env, json }) => {
  // const isAuthorized = authorization(request, env);
  // if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const slug = req.param('slug');
  const result = await deleteOne(tableName, slug, env);
  return json(result);
});

app.post('/query', async ({ req, env, json }) => {
  // const isAuthorized = authorization(request, env);
  // if (!isAuthorized) return new Response('Unauthorized', { status: 401 });

  const { sql }: { sql: string } = await req.json();
  if (!sql) return new Response('Missing SQL', { status: 400 });
  const result = await runQuery(sql, env);
  return json(result);
});

// router.get('/blog/:category_slug/', async (request, env) => {
//   const { category_slug } = request.params;
//
//   const result = await runSelect({ tableName, { category_slug }, env });
//   return jsonResponse(result);
// });

// // 404 for everything else
// app.all('*', () => new Response('Not Found.', { status: 404 }));
app.use('/*', serveStatic({ root: './' }));
export default app;
