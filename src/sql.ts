import { Env } from '.';

export interface Query {
  [key: string]: string | number | boolean;
}

const renderValue = (v: any) => {
  if (typeof v === 'string') {
    return `'${v}'`;
  } else if (Array.isArray(v) || typeof v === 'object') {
    return `'${JSON.stringify(v)}'`;
  } else {
    return v;
  }
};

const renderQuery = (query: Record<string, string | number | boolean>) => {
  return Object.entries(query).map(([k, v]) => `${k} = ${renderValue(v)}`);
};

// https://developers.cloudflare.com/d1/get-started/
export const insertOne = async (tableName: string, data: Query, env: Env) => {
  const keys = Object.keys(data);
  const values = Object.values(data).map((v) => renderValue(v));
  const sql = `INSERT INTO ${tableName} (${keys.join(
    ', '
  )}) VALUES (${values.join(', ')})`;
  return runQuery(sql, env);
};

// wrangler d1 execute DB --local --command="SELECT * FROM BlogEntries WHERE slug = 'hello-world'"
export const getOne = async (tableName: string, slug: string, env: Env) => {
  const sql = `SELECT * FROM ${tableName} WHERE slug = '${slug}'`;
  return runQuery(sql, env);
};

export const updateOne = async (
  tableName: string,
  slug: string,
  query: Query,
  env: Env
) => {
  const q = renderQuery(query);
  const sql = `UPDATE ${tableName}
    SET ${q.join(', ')}
    WHERE slug = '${slug}'`;
  return runQuery(sql, env);
};

export const deleteOne = async (tableName: string, slug: string, env: Env) => {
  const sql = `DELETE FROM ${tableName} 
    WHERE slug = '${slug}'`;
  return runQuery(sql, env);
};

export interface RunSelect {
  tableName: string;
  query?: Record<string, string | number>;
  env: Env;
}

export const runSelect = async ({ tableName, query = {}, env }: RunSelect) => {
  const q = renderQuery(query);
  const sql = `SELECT * FROM ${tableName} 
  ${q.length > 0 ? `WHERE ${q.join(' AND ')}` : ''}`;
  return runQuery(sql, env);
};

export const runQuery = async (sql: string, env: Env) => {
  const { DB } = env;
  try {
    return DB.prepare(sql).all();
  } catch (e) {
    console.log(sql);
    console.error(e);
  }
};
