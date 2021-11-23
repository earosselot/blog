function shortenText(text, maxWordCount) {
  let wordCount = 0;
  let i = 0;
  while (i < text.length && wordCount < maxWordCount) {
    if (text.charAt(i) === ' ') {
      wordCount++;
    }
    i++;
  }
  return text.substring(0, i - 1);
}

function extract(obj, ...keys) {
  const newObject = Object.assign({});
  Object.keys(obj).forEach((key) => {
    if (keys.includes(key)) {
      newObject[key] = obj[key];
      delete obj[key];
    }
  });
  return newObject;
}

export { shortenText, extract };
