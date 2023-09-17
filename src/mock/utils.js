function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export { getRandomArrayElement, getRandomArbitrary };
