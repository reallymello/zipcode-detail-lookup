import { ISearchParams } from './types/ISearchParams';
import ZipCode from './models/ZipCode';
import { zipCodes } from './zip-source-files/us-zip-codes';
import _ from 'lodash';
var csv = require('csvtojson');
import fs from 'fs';
import ZipCodeMapper from './models/ZipCodeMapper';

// function writeCsvToTsArray(
//   sourceCsv = './zip-source-files/uszips.csv',
//   outfile = './us-zip-codes1.ts'
// ) {
//   csv()
//     .fromFile(sourceCsv)
//     .then(function (jsonArrayObj: any) {
//       // console.log(jsonArrayObj);
//       const zipCodeArray = jsonArrayObj.map(
//         (zip: any) => new ZipCodeMapper(zip)
//       );

//       fs.writeFileSync(outfile, JSON.stringify(zipCodeArray, null, 2));
//     });
// }

/**
 * Returns a ZipCode object for the provided 5 character zip code
 * @param zipCode 5 digit zip code as a string
 * @returns ZipCode object matching the desired string or null if no match was found
 */
export function zip(zipCode: string): ZipCode | null {
  const result = zipCodes.find((zip) => zip.zip === zipCode);

  if (result) {
    return new ZipCode(result);
  } else {
    return null;
  }
}

/**
 * Returns a random ZipCode object. Useful for software tests requiring random, but valid data.
 * @returns ZipCode
 */
export function random(): ZipCode {
  const rZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
  return new ZipCode(rZip);
}

/**
 * An array of ZipCode objects matching the provided search parameters
 * @param param0
 * @returns ZipCode[]
 * @example .searchBy(stateAbbreviation: 'FL', county: 'Broward', population: 20000, populationOperator: '<')
 */
export function searchBy({ ...searchOptions }: ISearchParams) {
  const populationComparisonOperator =
    searchOptions.populationOperator ?? searchOptions.populationOperator;

  const filteredArray = zipCodes.filter((zip) => {
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
        return objectEquivalence && zip.population === searchOptions.population;
      }
    }
  });

  return filteredArray.map((zip: ZipCode) => new ZipCode(zip));
}
