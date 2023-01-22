import { BlogEntry } from '.';

const head = (blogEntry: BlogEntry, author: string, host: string) => {
  return `<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="${author}">

  <link rel="canonical" href="${host}">
  <link rel="alternate" type="application/rss+xml" title="RSS Feed for ${author}" href="/feed.xml" />

  <link rel="stylesheet" href="/style.css" type="text/css">

  <!-- Primary Meta Tags -->
  <title>${blogEntry.title} · Home</title>
  <meta name="title" content="${blogEntry.title} · Home">
  <meta name="description" content="${author}’s Personal Website">
  <meta name="author" content="${author}">
  <link rel="canonical" href="${host}">

  <!-- Fav Icon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#555555">
  <meta name="msapplication-TileColor" content="#000000">
  <meta name="theme-color" content="#ffffff">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${host}">
  <meta property="og:title" content="${author} · Home">
  <meta property="og:description" content="${author}’s Personal Website">
  <meta property="og:image" content="${host}f500.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary">
  <meta property="twitter:url" content="${host}">
  <meta property="twitter:title" content="${author} · Home">
  <meta property="twitter:description" content="${author}’s Personal Website">
  <meta property="twitter:image" content="${host}f500.png">
  <meta property="twitter:site" content="@Kamil_Selwa">
</head>`;
};

export const renderPage = (blogEntry: BlogEntry) => {
  const author = 'Kamil Selwa';
  const host = 'https://kamil.selwa.net/';

  return `<!DOCTYPE html>
  <html lang="en">
    ${head(blogEntry, author, host)}
    <body class="${blogEntry.category_slug} ${blogEntry.slug}">
      <header>
        <h1>${blogEntry.title}</h1>
      </header>
      <main>
        <h2>${blogEntry.title}</h2>
        ${blogEntry.html}
      </main>
      <footer>
        <p>Powered by <a href=""><3></a></p>
      </footer>
    </body>
  </html>`;
};
