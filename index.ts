import ZipCode from './models/ZipCode';
import zipCodes from './zip-source-files/us-zip-codes';
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

// const result = zipCodes.filter((zip) => {
//   if (zip.zip === '33071') {
//     return zip;
//   }
// });

// const myZip = new ZipCode(result[0]);
// myZip.population = 3;
// myZip.ci

// console.log(myZip);

export const lookup = () => {
  let filteredZips = zipCodes;

  const api = {
    result() {
      return filteredZips.map((zip) => new ZipCode(zip));
    },
    random() {
      const rZip = new ZipCode(
        filteredZips[Math.floor(Math.random() * zipCodes.length)]
      );
      return rZip;
    },
    zip(zipCode: string) {
      const result = zipCodes.find((zip) => zip.zip === zipCode);

      if (result) {
        return new ZipCode(result);
      } else {
        return null;
      }
    },
    byCity(city: string) {
      filteredZips = filteredZips.filter(
        (zip) => zip.city.toLowerCase() === city.toLowerCase()
      );
      return api;
    },
    byStateName(stateName: string) {
      filteredZips = filteredZips.filter(
        (zip) => zip.state_name.toLowerCase() === stateName.toLowerCase()
      );
      return api;
    },
    byStateAbbreviation(state: string) {
      filteredZips = filteredZips.filter(
        (zip) => zip.state_id.toLowerCase() === state.toLowerCase()
      );
      return api;
    },
    byCounty(county: string) {
      filteredZips = filteredZips.filter(
        (zip) => zip.county_name.toLowerCase() === county.toLowerCase()
      );
      return api;
    },
  };

  return api;
};

// console.log(lookup('33071'));

console.log(
  'chain',
  lookup().byStateAbbreviation('FL').byCity('Coral Springs').result()
);
