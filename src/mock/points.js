import { POINTS_TYPE } from '../const';
import { getRandomArrayElement, getRandomPhotos, getRandomDescription, getRandomArbitrary } from './utils';
import { POINTS_COUNT } from './const';

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
        title: 'Upgrede to a business class',
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

const mockPoints = [
  {
    basePrice: '20000',
    typePoint: getRandomArrayElement(POINTS_TYPE),
    destination: 'Moscow',
    timeStart: '2021-02-10 00:10',
    timeEnd: '2021-02-10 00:30',
    offersCheck: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
    isFavorite: true,
  },
  {
    basePrice: '5000',
    typePoint: getRandomArrayElement(POINTS_TYPE),
    destination: 'London',
    timeStart: '2021-02-10 00:20',
    timeEnd: '2021-02-10 13:00',
    offersCheck: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
    isFavorite: true,
  },
  {
    basePrice: '1',
    typePoint: getRandomArrayElement(POINTS_TYPE),
    destination: 'Paris',
    timeStart: '2021-04-03 00:00',
    timeEnd: '2021-04-05 20:00',
    offersCheck: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
    isFavorite: false,
  },
  {
    basePrice: '1234567',
    typePoint: getRandomArrayElement(POINTS_TYPE),
    destination: 'Istambul',
    timeStart: '2021-04-03 00:00',
    timeEnd: '2021-04-04 02:00',
    offersCheck: getRandomArrayElement(mockOffers),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
    isFavorite: false,
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

function getRandomPoints() {
  return Array.from({ length: POINTS_COUNT }, getRandomPoint);
}

// зачем нам это?
function getRangeIdOffer(point) {
  if (point.type === 'Taxi') {
    return getRandomArbitrary(1, 3);
  }
  if (point.type === 'Flight') {
    return getRandomArbitrary(4, 6);
  }
  if (point.type === 'Ship') {
    return getRandomArbitrary(7, 9);
  }
}

// function getMockOffers(point) {
//тут должна быть шляпа, которая формирует массив в оферами для конкретного поинта
// }

// function getAllOffers() {
//   const allOffersForMocks = [];
//   mockPoints.forEach((point) => {
//     mockOffers.find((offers) => {
//       if (point.type === offers.type) {
//         allOffersForMocks.push(offers.offers);
//       }
//     });
//   });
//   console.log(allOffersForMocks);
// }

// getAllOffers();

// function getAllOffers(mockOffers) {
//   const allOffersForMocks = [];
//   mockOffers.forEach((point) => {
//     console.log(point);
//   });
// };


// getAllOffers(mockOffers);

export { getRandomPoint, mockOffers, getRandomPoints };

