const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../dist');
const targetDir = 'e:\\Programming\\Python\\kershner_org\\static\\react-apps\\public-api-explorer\\dist';

function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyFolder(sourceDir, targetDir);