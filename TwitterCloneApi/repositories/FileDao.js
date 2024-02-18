import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const rootFolder = process.env.NODE_ENV === "development" ? "../TEMP" : "/tmp";

function saveData(key, value) {
  ensureRootFolderExists();

  const fileName = key + ".json";
  const filePath = path.join(rootFolder, fileName);

  const fileContent = JSON.stringify(value, null, 2);
  fs.writeFileSync(filePath, fileContent, "utf-8");
}

function ensureRootFolderExists() {
  if (!fs.existsSync(rootFolder)) {
    fs.mkdirSync(rootFolder, { recursive: true });
  }
}

function retrieveData(key) {
  ensureRootFolderExists();

  const fileName = key + ".json";
  const filePath = path.join(rootFolder, fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", { flag: "a" }, "utf-8");
    return null;
  }

  const fileContent = fs.readFileSync(filePath, {
    encoding: "utf8",
  });

  if (fileContent.length == 0) {
    return null;
  }
  const jsonContent = JSON.parse(fileContent);
  console.log(fileContent);
  return jsonContent;
}

export default { saveData, retrieveData };
