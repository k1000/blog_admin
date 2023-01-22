# blog_admin

`blog_admin` is #serverless [cloudflare worker](https://developers.cloudflare.com/workers/) managing DB with blog entries.

Blog entries are written in markdown github flavour and stored as html.

Each entry publish page directly to [edge cash API](https://developers.cloudflare.com/workers/examples/cache-api/) so practically public requests do not reach worker
