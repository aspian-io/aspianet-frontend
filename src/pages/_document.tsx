import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="ltr" className="scroll-smooth">
      <Head />
      <body>
        <div id="modal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
