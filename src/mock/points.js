import { POINTS_TYPE } from '../const';
import { getRandomArrayElement, getRandomPhotos, getRandomDescription, getRandomArbitrary } from './utils';
import { POINTS_COUNT, CITIES, Time, PRICE } from './const';

const mockOffers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 1,
        title: 'Choose the radio station',
        price: 60,
      },
      {
        id: 2,
        title: 'Smoking in the cabin',
        price: 100,
      },
      {
        id: 3,
        title: 'drink alcohol',
        price: 120,
      },
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 4,
        title: 'Change place',
        price: 70,
      },
      {
        id: 5,
        title: 'Upgrade to a business class',
        price: 90,
      },
      {
        id: 6,
        title: 'Touch stewardess',
        price: 20,
      },
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 7,
        title: 'Diving',
        price: 30,
      },
      {
        id: 8,
        title: 'Catch an octopus',
        price: 45,
      },
      {
        id: 9,
        title: 'Release octopus',
        price: 122,
      },
    ]
  },
];

function getRandomPoint() {
  const typePoint = getRandomArrayElement(POINTS_TYPE);
  return {
    basePrice: getRandomArrayElement(PRICE),
    typePoint,
    destination: getRandomArrayElement(CITIES),
    timeStart: getRandomArrayElement(Time.START),
    timeEnd: getRandomArrayElement(Time.END),
    offersCheck: getCheckedOffers(typePoint),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
    isFavorite: false,
  };
}

function getRandomPoints() {
  return Array.from({ length: POINTS_COUNT }, getRandomPoint);
}

function getCheckedOffers(typePoint) {
  const CheckedOffersId = [];
  const typeOffersObj = mockOffers.find((item) => item.type === typePoint);
  const objWithOffers = typeOffersObj.offers.slice(getRandomArbitrary(1, 2), getRandomArbitrary(1, 3));
  objWithOffers.forEach((el) => {
    CheckedOffersId.push(el.id);
  });
  return CheckedOffersId;
}

export { getRandomPoint, mockOffers, getRandomPoints };

