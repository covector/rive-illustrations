import fs from 'fs';

const removeImports = (data) => {
    return data
        .split('\n')
        .filter((val) => val.indexOf("import") != 0)
        .join('\n');
}

const removeFileImports = (fileName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        fs.writeFile(fileName, removeImports(data), 'utf8', function(err) {
            if (err) throw err;
        });
    });
}

const removeAllImports = (dir) => {
    let files = fs.readdirSync(dir);
    files.forEach((file) => {
    if (fs.statSync(dir + "/" + file).isDirectory()) {
        if (file != "node_modules") {
            removeAllImports(dir + "/" + file);
        }
    }
    else {
        if (file.endsWith(".js") && !file.endsWith("npm2cdn.js")) {
            removeFileImports(dir + "/" + file);
        }
    }
  })
}

removeAllImports(".");