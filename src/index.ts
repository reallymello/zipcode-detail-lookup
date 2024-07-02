import { ISearchParams, ISearchParamsKeys } from './types/ISearchParams';
import ZipCode from './models/ZipCode';
import { zipCodes } from './zip-source-files/us-zip-codes';
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
export function lookupZip(zipCode: string): ZipCode | null {
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
export function randomZip(): ZipCode {
  const rZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
  return new ZipCode(rZip);
}

/**
 * An array of ZipCode objects matching the provided search parameters
 * @param param0
 * @returns ZipCode[]
 * @example .searchBy(stateAbbreviation: 'FL', county: 'Broward', population: 20000, populationOperator: '<')
 */
export function lookupZipsWith({ ...searchOptions }: ISearchParams) {
  const populationComparisonOperator = searchOptions.populationOperator;

  const filteredArray = zipCodes.filter((zip) => {
    let objectEquivalence = isMatchingSearchCriteria(zip, searchOptions);

    // If not equivalent or there is no comparison operator immediately return result
    if (!objectEquivalence || !populationComparisonOperator) {
      return objectEquivalence;
    } else {
      //If both the record and the search population are null return a match, true
      if (!zip.population && !searchOptions.population) {
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

function isMatchingSearchCriteria(
  zipCode: ZipCode,
  searchOptions: ISearchParams
): boolean {
  const keys = Object.keys(searchOptions) as ISearchParamsKeys[];

  for (const key of keys) {
    if (key === 'population' || key === 'populationOperator') continue;
    if (zipCode[key] !== searchOptions[key]) return false;
  }
  return true;
}

/**
 * Returns the approximate distance between two zip codes using the Haversine formula {@link https://en.wikipedia.org/wiki/Haversine_formula} to account for spherical nature of the Earth.
 * @param firstZipCode Point A
 * @param secondZipCode Point B
 * @param distanceInMiles Uses miles if true, else kilometers
 * @returns Distance in miles or kilometers between two zip codes
 */
export function distanceBetweenZips(
  firstZipCode: string,
  secondZipCode: string,
  distanceInMiles = true
): number | null {
  const zip1 = lookupZip(firstZipCode);
  const zip2 = lookupZip(secondZipCode);

  if (!zip1 || !zip2) {
    return null;
  } else {
    return returnDistanceBetweenPoints(
      zip1.latitude,
      zip1.longitude,
      zip2.latitude,
      zip2.longitude,
      distanceInMiles
    );
  }
}

/**
 * Adopted formula for calculating distances between latitude and longitude from {@link https://simplemaps.com/resources/location-distance}
 * Copyright 2016, Chris Youderian, SimpleMaps, http://simplemaps.com/resources/location-distance
 * Released under MIT license - https://opensource.org/licenses/MIT
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @param returnInMiles
 * @returns Approximate distance in miles or kilometers based on returnInMiles setting
 */
function returnDistanceBetweenPoints(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  returnInMiles = true
) {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  function square(x: number) {
    return Math.pow(x, 2);
  }
  const radiusOfEarthInKm = 6371; // radius of the earth in km
  lat1 = deg2rad(lat1);
  lat2 = deg2rad(lat2);
  var lat_dif = lat2 - lat1;
  var lng_dif = deg2rad(lng2 - lng1);
  var a =
    square(Math.sin(lat_dif / 2)) +
    Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
  var d = 2 * radiusOfEarthInKm * Math.asin(Math.sqrt(a));
  if (returnInMiles) {
    //return miles
    return d * 0.621371;
  } else {
    //return km
    return d;
  }
}
