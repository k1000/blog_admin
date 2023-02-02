import { BlogEntry, Env } from '.';

export interface Query {
  [key: string]: string | number | boolean;
}

const renderValue = (v: any) => {
  if (typeof v === 'string') {
    return ["date('now')", "datetime('now')"].includes(v.trim().toLowerCase())
      ? v
      : `'${v}'`;
  } else if (Array.isArray(v) || typeof v === 'object') {
    return `'${JSON.stringify(v)}'`;
  } else {
    return v;
  }
};

const renderQuery = (query: Record<string, string | number | boolean>) => {
  return Object.entries(query).map(([k, v]) => `${k} = ${renderValue(v)}`);
};

export function sanitizeString(str: string) {
  // whitelist a-z, 0-9, space, comma, period, dash, underscore
  str = str.replace(/[^a-z0-9 \.,_-]/gim, '');
  return str.trim();
}
// https://developers.cloudflare.com/d1/get-started/
export const insertOne = async (tableName: string, data: Query, env: Env) => {
  const keys = Object.keys(data);
  const values = Object.values(data).map((v) => renderValue(v));
  const sql = `INSERT INTO ${tableName} (${keys.join(
    ', '
  )}) VALUES ( ${values.join(', ')});`;
  return (await runQuery(sql, env)).run();
};

// wrangler d1 execute DB --local --command="SELECT * FROM BlogEntries WHERE slug = 'hello-world'"
export const getOne = async (tableName: string, slug: string, env: Env) => {
  const sql = `SELECT * FROM ${tableName} WHERE slug = '${sanitizeString(
    slug
  )}' LIMIT 1;`;
  return (await runQuery(sql, env)).all();
};

export const updateOne = async (
  tableName: string,
  slug: string,
  query: Query,
  env: Env
) => {
  const q = renderQuery(query);
  const sql = `
    UPDATE ${tableName} SET ${q.join(', ')} WHERE slug = '${slug}'`;
  return (await runQuery(sql, env)).all();
};

export const deleteOne = async (tableName: string, slug: string, env: Env) => {
  const sql = `DELETE FROM ${tableName} 
    WHERE slug = '${sanitizeString(slug)}';`;
  return (await runQuery(sql, env)).run();
};

export interface RunSelect<BlogEntry> {
  tableName: string;
  query?: Partial<BlogEntry>;
  env: Env;
}

export async function runSelect<BlogEntry>({
  tableName,
  query,
  env,
}: RunSelect<BlogEntry>) {
  const q = renderQuery(query as any);
  const sql = `SELECT * FROM ${tableName} 
  ${q.length > 0 ? `WHERE ${q.join(' AND ')}` : ''}`;
  return (await runQuery(sql, env)).all();
}

export const runQuery = async (sql: string, env: Env) => {
  const { DB } = env;
  return DB.prepare(sql);
};
