// eslint-disable-next-line import/extensions,import/no-unresolved
import manifest from '../dist/manifest';

const service = process.env.VUE_APP_SDK_SERVICE;

const id = 'id_embed';
const element = document.getElementById(id);

if (element === null || !element) {
  const mainJs = manifest['main.js'];
  const scriptManifest = document.createElement('script');
  scriptManifest.id = id;
  scriptManifest.src = service + mainJs;
  document.head.appendChild(scriptManifest);
}
