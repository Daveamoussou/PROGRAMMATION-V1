/* Télécharge Python (Pyodide), le moteur SQL et les polices pour le hors connexion.
   Usage : node telecharger-moteurs.js   (Node 18 ou plus, internet requis une seule fois) */
const fs = require('fs');
const path = require('path');

const CDN = 'https://cdn.jsdelivr.net/npm/';
const PY = CDN + 'pyodide@0.26.4/';
const SQL = CDN + 'sql.js@1.8.0/dist/';
const font = (pkg, name) => [`${CDN}@fontsource/${pkg}/files/${name}.woff2`, `fonts/${name}.woff2`];

const FILES = [
  ['pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']
    .map((f) => [PY + f, 'vendor/pyodide/' + f]),
  ['sql-wasm.js', 'sql-wasm.wasm'].map((f) => [SQL + f, 'vendor/sqljs/' + f]),
  [
    font('bricolage-grotesque', 'bricolage-grotesque-latin-700-normal'),
    font('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal'),
    font('instrument-sans', 'instrument-sans-latin-400-normal'),
    font('instrument-sans', 'instrument-sans-latin-600-normal'),
    font('jetbrains-mono', 'jetbrains-mono-latin-400-normal'),
    font('jetbrains-mono', 'jetbrains-mono-latin-500-normal')
  ]
].flat();

(async () => {
  let echecs = 0;
  for (const [url, dest] of FILES) {
    const out = path.join(__dirname, dest);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
      console.log('OK     ' + dest);
    } catch (e) {
      echecs++;
      console.log('ERREUR ' + dest + ' (' + e.message + ')');
    }
  }
  console.log(echecs ? `\n${echecs} fichier(s) manquant(s) : relance la commande.` : '\nTout est prêt. Lance un serveur local (voir LISEZMOI.md).');
})();
