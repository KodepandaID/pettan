const fs = require('fs');

class File {
  stored(path, data = []) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(path, jsonData);
  }

  loadFile(path) {
    const jsonData = JSON.parse(fs.readFileSync(path, 'utf-8'));

    return jsonData;
  }
}

module.exports = new File();
