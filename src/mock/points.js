import { POINTS_TYPE } from '../const';
import { getRandomArrayElement, getRandomPhotos, getRandomDescription } from './utils';
import { POINTS_COUNT } from './const';

const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Choose the radio station',
        'price': 60,
      },
      {
        'id': 2,
        'title': 'Smoking in the cabin',
        'price': 100,
      },
      {
        'id': 3,
        'title': 'drink alcohol',
        'price': 120,
      },
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 4,
        'title': 'Change place',
        'price': 70,
      },
      {
        'id': 5,
        'title': 'Upgrede to a business class',
        'price': 90,
      },
      {
        'id': 6,
        'title': 'Touch stewardess',
        'price': 20,
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 7,
        'title': 'Diving',
        'price': 30,
      },
      {
        'id': 8,
        'title': 'Catch an octopus',
        'price': 45,
      },
      {
        'id': 9,
        'title': 'Release octopus',
        'price': 122,
      },
    ]
  },
];

const mockPoints = [
  {
    type: getRandomArrayElement(POINTS_TYPE),
    destination: 'Moscow',
    timeStart: '2021-02-10 00:10',
    timeEnd: '2021-02-10 00:30',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
  },
  {
    type: getRandomArrayElement(POINTS_TYPE),
    destination: 'London',
    timeStart: '2021-02-10 00:20',
    timeEnd: '2021-02-10 13:00',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
  },
  {
    type: getRandomArrayElement(POINTS_TYPE),
    destination: 'Paris',
    timeStart: '2021-04-03 00:00',
    timeEnd: '2021-04-05 20:00',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
  },
  {
    type: getRandomArrayElement(POINTS_TYPE),
    destination: 'Istambul',
    timeStart: '2021-04-03 00:00',
    timeEnd: '2021-04-04 02:00',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

function getRandomPoints() {
  return Array.from({ length: POINTS_COUNT }, getRandomPoint);

}


export { getRandomPoint, mockOffers, getRandomPoints };

