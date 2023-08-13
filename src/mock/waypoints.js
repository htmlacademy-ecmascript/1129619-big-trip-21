import { WAYPOINTS_TYPE, DESCRIPTION, PHOTO_SITE } from '../const';
import { getRandomArbitrary, getRandomArrayElement } from '../utils';

function getFivePhoto() {
  const photoArr = [];
  for (let i = 0; i < 5; i++) {
    photoArr.push(PHOTO_SITE + getRandomArbitrary(1, 100));
  }
  return photoArr;
}

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
        'id': 1,
        'title': 'Change place',
        'price': 70,
      },
      {
        'id': 2,
        'title': 'Upgrede to a business class',
        'price': 90,
      },
      {
        'id': 3,
        'title': 'Touch stewardess',
        'price': 20,
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Diving',
        'price': 30,
      },
      {
        'id': 2,
        'title': 'Catch an octopusUpgrede to a business class',
        'price': 45,
      },
      {
        'id': 3,
        'title': 'Release octopus',
        'price': 122,
      },
    ]
  },
];

const mockWaypoints = [
  {
    type: getRandomArrayElement(WAYPOINTS_TYPE),
    destination: 'Moscow',
    timeStart: '2021-02-10 00:10',
    timeEnd: '2021-02-10 00:30',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomArrayElement(DESCRIPTION.split('. ')),
    photo: getFivePhoto(),
  },
  {
    type: getRandomArrayElement(WAYPOINTS_TYPE),
    destination: 'London',
    timeStart: '2021-02-10 00:20',
    timeEnd: '2021-02-10 13:00',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomArrayElement(DESCRIPTION.split('. ')),
    photo: getFivePhoto(),
  },
  {
    type: getRandomArrayElement(WAYPOINTS_TYPE),
    destination: 'Paris',
    timeStart: '2021-04-03 00:00',
    timeEnd: '2021-04-05 20:00',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomArrayElement(DESCRIPTION.split('. ')),
    photo: getFivePhoto(),
  },
  {
    type: getRandomArrayElement(WAYPOINTS_TYPE),
    destination: 'Istambul',
    timeStart: '2021-04-03 00:00',
    timeEnd: '2021-04-04 02:00',
    additionally: getRandomArrayElement(mockOffers),
    description: getRandomArrayElement(DESCRIPTION.split('. ')),
    photo: getFivePhoto(),
  },
];

function getRandomWaypoint() {
  return getRandomArrayElement(mockWaypoints);
}

export { getRandomWaypoint };

