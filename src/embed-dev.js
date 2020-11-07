const service = process.env.VUE_APP_SDK_SERVICE;

const id = 'id_embed';
const element = document.getElementById(id);

if (element === null || !element) {
  const mainJs = '/dist/app.js';
  const scriptManifest = document.createElement('script');
  scriptManifest.id = id;
  scriptManifest.src = service + mainJs;
  scriptManifest.setAttribute('async', '');
  document.head.appendChild(scriptManifest);
}
