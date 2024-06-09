/* eslint-disable no-inner-declarations */
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createRequire } from "module";
import { promisify } from "util";
import ignore from "ignore";

// Helper to get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify some fs functions for easier use with async/await
const readdir = promisify(fs.readdir);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stat = promisify(fs.stat);

// Get command-line arguments
// eslint-disable-next-line no-undef
const args = process.argv.slice(2);
const folderPath = path.resolve(__dirname, args[0]);
const outputZipPath = path.resolve(__dirname, args[1]);
const ignorePath = args[2] && path.resolve(__dirname, args[2]);

async function readGitignore() {
  if (!ignorePath) {
    return ignore();
  }

  try {
    const gitignoreContent = await fsPromises.readFile(ignorePath, "utf8");
    return ignore().add(gitignoreContent);
  } catch (err) {
    console.error("Error reading .gitignore file:", err);
    return ignore();
  }
}

async function zipFolder() {
  try {
    // Check if the output zip file already exists and delete it if it does
    try {
      await fsPromises.access(outputZipPath);
      await fsPromises.unlink(outputZipPath);
      console.log(`Existing file ${outputZipPath} deleted.`);
    } catch (err) {
      // The file does not exist, no need to delete
    }

    // Create a file to stream archive data to
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level
    });

    // Listen for all archive data to be written
    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
    });

    // Catch warnings (i.e. stat failures) and errors
    archive.on("warning", (err) => {
      if (err.code !== "ENOENT") {
        throw err;
      }
    });

    archive.on("error", (err) => {
      throw err;
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Read the .gitignore file
    const ig = await readGitignore();

    // Recursively add files to the archive, filtering with .gitignore
    async function addFiles(dir) {
      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(folderPath, fullPath);

        if (ig.ignores(relativePath)) {
          continue; // Skip ignored files and directories
        }

        if (entry.isDirectory()) {
          await addFiles(fullPath); // Recursively add directory contents
        } else {
          archive.file(fullPath, { name: relativePath }); // Add file to the archive
        }
      }
    }

    await addFiles(folderPath);

    // Finalize the archive (i.e. we are done appending files but streams have to finish yet)
    await archive.finalize();
    console.log(`Folder ${folderPath} has been zipped to ${outputZipPath}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

zipFolder();
