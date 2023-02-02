import { Header } from './Head';

export const Layout = (props: { children?: any }) => {
  return (
    <html>
      <head>
        <title>kamil selwa</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital@0;1&family=Merriweather:ital,wght@0,300;0,700;1,300&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Header />
        {props.children}
      </body>
    </html>
  );
};
