const fs = require('fs');
const apiConfigPath = require('path').join(
  __dirname,
  '..',
  'src/service/api.js'
);

let apiConfigFileContent = fs.readFileSync(apiConfigPath, {
  encoding: 'utf-8',
});
apiConfigFileContent = apiConfigFileContent.replace(
  /hml:.*,/,
  `hml: 'https://apisandbox.apps.plantaoextra.com',`
);
fs.writeFileSync(apiConfigPath, apiConfigFileContent, { encoding: 'utf-8' });