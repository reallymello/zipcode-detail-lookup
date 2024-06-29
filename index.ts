import { ISearchParams } from './models/ISearchParams';
import ZipCode from './models/ZipCode';
import { zipCodes } from './zip-source-files/us-zip-codes';
import _ from 'lodash';
var csv = require('csvtojson');
import fs from 'fs';
import ZipCodeMapper from './models/ZipCodeMapper';

function writeCsvToTsArray(sourceCsv = './zip-source-files/uszips.csv') {
  csv()
    .fromFile(sourceCsv)
    .then(function (jsonArrayObj: any) {
      // console.log(jsonArrayObj);
      const zipCodeArray = jsonArrayObj.map(
        (zip: any) => new ZipCodeMapper(zip)
      );

      fs.writeFileSync(
        './us-zip-codes1.ts',
        JSON.stringify(zipCodeArray, null, 2)
      );
    });
}

export function zip(zipCode: string) {
  const result = zipCodes.find((zip) => zip.zip === zipCode);

  if (result) {
    return new ZipCode(result);
  } else {
    return null;
  }
}

export function random(): ZipCode {
  const rZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
  return new ZipCode(rZip);
}

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
