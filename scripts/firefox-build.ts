import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

function copyFolder(source: string, destination: string): void {
  const sourcePath = path.resolve(source);
  const destPath = path.resolve(destination);

  fs.mkdirSync(destPath, { recursive: true });

  const files = fs.readdirSync(sourcePath);
  files.forEach((file) => {
    const srcFile = path.join(sourcePath, file);
    const destFile = path.join(destPath, file);
    try {
      fs.copyFileSync(srcFile, destFile);
    } catch (err) {
      console.error(err);
    }
  });

  console.log(`Folder copied from ${sourcePath} to ${destPath}`);
}

function adaptManifest(manifestPath: string): void {
  const manifestFile = path.resolve(manifestPath);
  const manifestData = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));

  delete manifestData.background;
  delete manifestData.version_name;
  delete manifestData.web_accessible_resources.use_dynamic_url;
  manifestData.browser_specific_settings.gecko.id = 'searchhub@searchhub.com';

  fs.writeFileSync(manifestFile, JSON.stringify(manifestData, null, 2));

  console.log(`Manifest file modified: ${manifestFile}`);
}

function createZipArchive(inputFolder: string, outputFilePath: string): void {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const inputFolderPath = path.resolve(inputFolder);
  const outputFilePathFull = path.resolve(__dirname, outputFilePath);

  const output = fs.createWriteStream(outputFilePathFull);
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', () => {
    console.log(`ZIP file created: ${archive.pointer()} total bytes`);
  });

  archive.on('error', (err: Error) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(inputFolderPath, false);
  archive.finalize();
}

const sourceFolder = 'dist/';
const destinationFolder = 'dist-firefox/';
const manifestFilePath = `${destinationFolder}manifest.json`;
const zipOutputFile = 'search-hub-firefox.zip';

copyFolder(sourceFolder, destinationFolder);
adaptManifest(manifestFilePath);
createZipArchive(destinationFolder, zipOutputFile);
