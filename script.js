const hangmanData = {
  categories: {}
};

fetch('./color-names.json')
  .then((response) => response.json())
  .then((json) => processJson(json, 'colors'));

fetch('./animals.json')
  .then((response) => response.json())
  .then((json) => processJson(json, 'animals'));

fetch('./countries.json')
  .then((response) => response.json())
  .then((json) => processJson(json, 'countries'));

fetch('./fruits.json')
  .then((response) => response.json())
  .then((json) => processJson(json, 'fruits'));


function processJson(json, categoryName) {

  switch (categoryName) {
    case 'colors':
      addArray(json, categoryName);
      break;
    case 'animals':
      addArray(json, categoryName);
      break;
    case 'countries':
      addObjectArray(json, categoryName, 'name');
      break;
    case 'fruits':
      addObjectArray(json, categoryName, 'name');
      break;
  }

  console.log(hangmanData);
}

function addArray(json, categoryName) {
  hangmanData.categories[categoryName] = [];

  for (i in json) {
    hangmanData.categories[categoryName].push(json[i]);
  }
}

function addObjectArray(json, categoryName, nameKey) {
  hangmanData.categories[categoryName] = [];

  for (i in json) {
    hangmanData.categories.countries.push(json[i][nameKey]);
  }
}

// SAVE TO FILE:

function saveTextToFile(textToSave, fileName, fileType) {
  // textToSave is a string
  // fileName is a string with file type extension e.g "data.json"
  // file type as string e.g "text/plain"

  // file setting
  const text = textToSave;
  const name = fileName;
  const type = fileType;

  // create file
  const a = document.createElement("a");
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// SAVE JSON ObJECT TO FILE:

function saveJsonObjToFile(jsonObjectToSave, fileName, fileType) {
  // jsonObjectToSave is a javascript object
  // fileName is a string with file type extension e.g "data.json"
  // file type as string e.g "text/plain"

  // file setting
  const text = JSON.stringify(jsonObjectToSave);
  const name = fileName;
  const type = fileType;

  // create file
  const a = document.createElement("a");
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', saveObject);

function saveObject() {
  saveJsonObjToFile(hangmanData, "hangman-data.json", "text/plain")
}