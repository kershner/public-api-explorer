/**
 * Recursively processes text files in the specified build directory, 
 * replacing asset paths with a given static path URL prefix.
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../dist');
const staticPath = '/static/react-apps/publicApiExplorer/dist';
const pathsToReplace = ['/assets', '/_expo'];
const allowedExtensions = ['.html', '.js', '.css'];

const replaceAssetPaths = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    pathsToReplace.forEach((originalPath) => {
      content = content.replace(
        new RegExp(`(["'(=])(${originalPath})(?!(https?://|${staticPath}))`, 'g'),
        `$1${staticPath}${originalPath}`
      );
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated asset paths in ${filePath}`);
  } catch (error) {
    console.error(`Failed to process ${filePath}:`, error.message);
  }
};

const processDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (stat.isFile() && allowedExtensions.includes(path.extname(file))) {
      replaceAssetPaths(filePath);
    }
  });
};

processDirectory(buildDir);
