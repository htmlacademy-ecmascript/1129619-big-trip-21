import { DESCRIPTION } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


function getRandomDescription(min = 2, max = 7) {
  const descriptionArr = [];
  const rand = Math.floor(min + Math.random() * (max + 1 - min));
  for (let i = 0; i < rand; i++) {
    descriptionArr.push(getRandomArrayElement(DESCRIPTION.split('. ')));
  }
  return descriptionArr.join('. ');
}

export { getRandomArrayElement, getRandomArbitrary, getRandomDescription };
