/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
const gcs = require('@google-cloud/storage')();
const fs  = require('fs');
const os  = require('os');
const path = require('path');
const arrayUniq = require('array-uniq');

exports.processFile = function(event, callback) {
  const object = event.data; // The Storage object

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  console.log('Processing bucket: ' + fileBucket);
  console.log('Processing file: ' + filePath);

  // Get the file name.
  const fileName = path.basename(filePath);
  const bucket = gcs.bucket(fileBucket);
  const resultBucket = gcs.bucket('id-list-result');

  var file = bucket.file(filePath);

  file.exists(function(err, exists) {
    if (exists) {
      console.log("EXISTS");
    } else {
      console.log("NOT EXISTS");
    }
  });

  bucket.getFiles(function(err, files) {
      console.log("Files");
      if (!err) {
          console.log(files[0].name);
          // files is an array of File objects.
      }
  });

  const tempFilePath = path.join(os.tmpdir(), fileName);
  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    console.log("To do : read file");
    fs.readFile(tempFilePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log("File content read:\n" + data);
      var lines = data.split(/\r?\n/);
      lines = arrayUniq(lines);
      fs.writeFile(tempFilePath, lines.join("\n"), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
        resultBucket.upload(tempFilePath, {destination: filePath});
      });
    });
  });

  console.log('To do: manage the uniqueness id process of the content of this file');
  callback();
};
