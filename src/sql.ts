import { Env } from '.';

export interface Query {
  [key: string]: string | number;
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

// https://developers.cloudflare.com/d1/get-started/
export const insertOne = async (tableName: string, data: Query, env: Env) => {
  const { DB } = env;
  const keys = Object.keys(data);
  const values = Object.values(data).map((v) => renderValue(v));
  const sql = `INSERT INTO ${tableName} (${keys.join(
    ', '
  )}) VALUES (${values.join(', ')})`;
  console.log(sql);
  return DB.prepare(sql).bind('DB synopsis').all();
};

// wrangler d1 execute DB --local --command="SELECT * FROM BlogEntries WHERE slug = 'hello-world'"
export const getOne = async (tableName: string, slug: string, env: Env) => {
  const { DB } = env;
  const sql = `SELECT * FROM ${tableName} WHERE slug = '${slug}'`;
  console.log(sql);
  return DB.prepare(sql).all();
};

export const updateOne = async (
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

export const deleteOne = async (tableName: string, slug: string, env: Env) => {
  const { DB } = env;
  const sql = `DELETE FROM ${tableName} 
    WHERE slug = '${slug}'`;
  // console.log(sql);
  return DB.prepare(sql).all();
};

export interface RunQuery {
  tableName: string;
  query?: Record<string, string | number>;
  env: Env;
}

const renderQuery = (query: Record<string, string | number>) => {
  return Object.entries(query).map(([k, v]) => `${k} = ${renderValue(v)}`);
};

export const runSelect = async ({ tableName, query = {}, env }: RunQuery) => {
  const { DB } = env;
  const q = renderQuery(query);
  const sql = `SELECT * FROM ${tableName} 
  ${q.length > 0 ? `WHERE ${q.join(' AND ')}` : ''}`;
  console.log(sql);
  return DB.prepare(sql).all();
};
