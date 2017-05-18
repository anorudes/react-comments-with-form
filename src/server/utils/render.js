import readJson from 'read-package-json';

// Read version from package.json
let bundleVersion;
readJson(__dirname + '/../../../package.json', console.error, false, (err, data) => {
  bundleVersion = data.version;
});

const escapeSymbolsForStringify = text => {
  return text.replace(/\u2028/g, '').replace(/\u2029/g, '');
};

export const renderFullPage = (html, domain, projectName, manifestMain, manifestChunk, initialState = null, head, ssrEnabled = false) => {
  let htmlLang = 'ru';
  const userState = (initialState || {}).user || {};
  if (userState.user && userState.user.language && userState.user.language === 'en') {
    htmlLang = 'en';
  }

  const manifestMainScript = (manifestMain ? manifestMain['main.js'] : `prj_${projectName}.js`) + `?v=${bundleVersion}`;
  const manifestMainCss = `common.css?v=${bundleVersion}`;
  const manifestProjectCss = (manifestMain ? manifestMain['main.css'] : `${projectName}.css`) + `?v=${bundleVersion}`;

  const bundleCSS = ssrEnabled
    ? `<link rel="stylesheet" type="text/css" href="/dist/${manifestMainCss}"></style><link rel="stylesheet" type="text/css" href="/dist/${manifestProjectCss}"></style>`
    : '';

  const initialStateStringify = escapeSymbolsForStringify(JSON.stringify(initialState || {}));


  const manifestChunkScript = manifestChunk ? `
    <script>
      //<![CDATA[
      window.webpackManifest = ${JSON.stringify(manifestChunk)}
      //]]>
    </script>
  ` : '';

  return `<!doctype html>
    <html lang="${htmlLang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">

        ${bundleCSS}

        ${manifestChunkScript}
      </head>
      <body>
        <div id="root">${html ? html : ''}</div>
        <div id="uploadcare-vendor"></div>
        <div id="google-plus-vendor"></div>
        <div id="vk_api_transport"></div>

        <script>
          window.__INITIAL_STATE__ = ${initialStateStringify};
        </script>

        <script src="/static/vendors/index.js" charset="utf-8"></script>
        <script src="/dist/${manifestMainScript}"></script>

        <noscript><div><img src="https://mc.yandex.ru/watch/37584555" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
      </body>
    </html>
    `;
};
