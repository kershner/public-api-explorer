const fs = require('fs');
const path = require('path');

const S3_BASE_URL = 'https://djfdm802jwooz.cloudfront.net/static/react-apps/public-api-explorer';
const hash = 'ce3dac18e00b9f561e8f204d879840ea';
const distDir = path.join(__dirname, '../dist');

// 1. Rename the file
const jsDir = path.join(distDir, '_expo/static/js/web');
fs.readdir(jsDir, (err, files) => {
  if (err) {
    console.error('Error reading JS directory:', err);
    return;
  }

  const targetFile = files.find((file) => file.startsWith('entry-') && file.endsWith('.js'));
  if (targetFile) {
    const oldFilePath = path.join(jsDir, targetFile);
    const newFilePath = path.join(jsDir, `entry-${hash}.js`);
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) console.error('Error renaming file:', err);
      else console.log(`Renamed ${targetFile} to entry-${hash}.js`);
    });
  } else {
    console.error('Target JS file not found!');
  }
});

// 2. Update the hash in the HTML file
const htmlFilePath = path.join(distDir, 'index.html');
fs.readFile(htmlFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading HTML file:', err);
    return;
  }

  const updatedHtml = data.replace(
    /<script src="https:\/\/[^"]+\/entry-[\da-f]+\.js" defer><\/script>/,
    `<script src="${S3_BASE_URL}/dist/_expo/static/js/web/entry-${hash}.js" defer></script>`
  );

  fs.writeFile(htmlFilePath, updatedHtml, 'utf8', (err) => {
    if (err) console.error('Error updating HTML file:', err);
    else console.log('Updated hash in HTML file.');
  });
});
