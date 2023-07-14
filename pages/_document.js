import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

function MyDocument(props) {
  const { __html, ids } = props;
  return (
    <Html>
      <Head>
        {ids?.map((id) => (
          <style key={id} dangerouslySetInnerHTML={{ __html: __html[id] }} />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      ...sheet.getStyleElement(),
    };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
