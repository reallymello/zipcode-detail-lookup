import { ISearchParams } from './models/ISearchParams';
import ZipCode from './models/ZipCode';
import { zipCodes } from './zip-source-files/us-zip-codes';
import _ from 'lodash';

// var csv = require('csvtojson');
// import fs from 'fs';

// let message: string = 'Hello World';
// console.log(message);

// console.log(zipCodes[0].zip);

// csv()
//   .fromFile('./zip-source-files/uszips.csv')
//   .then(function (jsonArrayObj: any) {
//     //when parse finished, result will be emitted here.
//     console.log(jsonArrayObj);

//     fs.writeFileSync(
//       './us-zip-codes1.ts',
//       JSON.stringify(jsonArrayObj, null, 2)
//     );
//   });

// csv()
//   .fromFile('./zip-source-files/uszips.csv')
//   .then(function (jsonArrayObj: any) {
//     //when parse finished, result will be emitted here.
//     console.log(jsonArrayObj);
//     const zipCodeArray = jsonArrayObj.map((zip: any) => new ZipCode(zip));

//     fs.writeFileSync(
//       './us-zip-codes1.ts',
//       JSON.stringify(zipCodeArray, null, 2)
//     );
//   });

export function zip(zipCode: string) {
  const result = zipCodes.find((zip) => zip.zip === zipCode);

  if (result) {
    return result;
  } else {
    return null;
  }
}

export function random() {
  const rZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
  return rZip;
}

export function searchBy({ ...searchOptions }: ISearchParams) {
  const populationComparisonOperator =
    searchOptions.populationOperator ?? searchOptions.populationOperator;

  return zipCodes.filter((zip) => {
    let searchObject: ZipCode = { ...zip, ...searchOptions };
    let objectEquivalence = _.isEqual(
      _.omit(zip, ['populationOperator', 'population']),
      _.omit(searchObject, ['populationOperator', 'population'])
    );

    // If not equivalent or there is no comparison operator immediately return result
    if (!objectEquivalence || !populationComparisonOperator) {
      return objectEquivalence;
    } else {
      //If both the record and the search population are null return a match, true
      if (!zip.population && !searchObject.population) {
        return objectEquivalence && true;
      }
      // If the population of either object is null, return false
      if (!zip.population || !searchOptions.population) {
        return false;
      }
      if (populationComparisonOperator === '>') {
        return objectEquivalence && zip.population > searchOptions.population;
      }
      if (populationComparisonOperator === '<') {
        return objectEquivalence && zip.population < searchOptions.population;
      }
      if (populationComparisonOperator === '=') {
        return objectEquivalence && (zip.population = searchOptions.population);
      }
    }
  });
}

// console.log(
//   searchBy({
//     city: 'Coral Springs',
//     county: 'Broward',
//     population: 60000,
//     populationOperator: '>',
//   })
// );
