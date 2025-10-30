import { minify } from "terser";
import fs from "fs";
import path from "path";

function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsFiles(filePath));
    } else if (file.endsWith(".js")) {
      results.push(filePath);
    }
  });
  return results;
}

const srcFolder = path.join(process.cwd(), "src");
const distFolder = path.join(process.cwd(), "dist");

if (!fs.existsSync(distFolder)) fs.mkdirSync(distFolder);

const jsFiles = getAllJsFiles(srcFolder);

jsFiles.forEach(file => {
  const code = fs.readFileSync(file, "utf-8");

  minify(code, { compress: true, mangle: true, module: true })
    .then(result => {

      const relativePath = path.relative(srcFolder, file);
      const outPath = path.join(distFolder, relativePath);
      const outDir = path.dirname(outPath);

      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outPath, result.code, "utf-8");
    })
    .catch(err => console.error(`Error minifying ${file}:`, err));
});
