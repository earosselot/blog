
function extractObjectProperties(newObject){
  const cachedProperties = {};
  for (const property in newObject) {
    if (typeof newObject[property] === 'object') {
      cachedProperties[property] = newObject[property];
      newObject[property] = newObject[property]._id;
    }
  }
  return cachedProperties;
}

function insertObjectProperties(newObject, cachedProperties) {
  for (const property in cachedProperties) {
    newObject[property] = cachedProperties[property];
  }
}

export { extractObjectProperties, insertObjectProperties };
