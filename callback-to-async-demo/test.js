const fs = require('fs');
const assert = require('assert');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  assert.ok(data.length > 0, "File should not be empty");
  console.log("✅ Test passed: File is not empty.");
});
