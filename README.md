# blog_admin

`blog_admin` is #serverless [cloudflare worker](https://developers.cloudflare.com/workers/) managing DB with blog entries.

Blog entries are written in markdown github flavour and stored as html.

Each entry publish page directly to [edge cash API](https://developers.cloudflare.com/workers/examples/cache-api/) so practically public requests do not reach worker

## How to use

`wrangler dev --local --persist`

populate DB with schema
`wrangler d1 execute synopsis --local --file=./schema.sql`

`wrangler d1 execute DB --local --command="SELECT * FROM blog WHERE slug = 'hello-world'"`

`wrangler d1 execute DB --local --command="SELECT \* FROM blog"`

inspect: `brave://inspect/#devices`

https://fatih-erikli.com/creating-user-authentication-in-cloudflare-workers.html
