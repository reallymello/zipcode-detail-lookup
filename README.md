# zipcode-detail-lookup

[![Build Status](https://github.com/reallymello/zipcode-detail-lookup/actions/workflows/node.js.yml/badge.svg)](https://github.com/reallymello/zipcode-detail-lookup/actions/workflows/node.js.yml)

![Line Coverage](./badges/badge-lines.svg)
![Statement Coverage](./badges/badge-statements.svg)
![Function Coverage](./badges/badge-functions.svg)
![Branch Coverage](./badges/badge-branches.svg)

Given a US zip code, provided or random, this program returns the associated State, County, City, and other useful information; latitude, longitude, density, population, military designation, timezone. Also, provides ability to search for zip codes using population size, state, county, city, latitude, and longitude. Last, the ability is provided to calculate the miles or kilometers between two zip codes.

The data source contains US states and territories.

<a href="https://www.buymeacoffee.com/reallymello" alt="buy me a coffee" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="30"></a>

The database is originally derived from the 2024 free-tier list provided by SimpleMaps <https://simplemaps.com/data/us-zips>.

## Installation

Install zipcode-detail-lookup as a dependency in your project.

```sh
npm install zipcode-detail-lookup --save
```

After, import it into your code at the top of your project

```ts
import {
  lookupZip,
  lookupZipsWith,
  randomZip,
  distanceBetweenZips,
} from 'zipcode-detail-lookup';
```

## Usage

Zip Code Lookup provides 3 functions; lookupZip, randomZip, searchBy, and distanceBetweenZips. zip and random return a single zip code object result whereas searchBy will return an array of matches. distanceBetweenZips returns the distance between two zipes codes in miles or kilometers using their associated latitude and longitude.

### lookupZip(zipCode: string)

```ts
const fll = lookupZip(33316); // For returning an object for the 33316 Ft. Lauderdale zip code.
console.log(fll.state); // Florida
console.log(fll.stateAbbreviation); // FL
console.log(fll.county); // Broward
console.log(fll.city); // Fort Lauderdale
```

### randomZip()

This will return a random zip code from the data set and will include all the properties as mentioned in the previous example (state, city, county, demographics, location, etc.)

```ts
const rZip = randomZip();

console.log(rZip.zip); // Random zip code e.g. 11122
```

### lookupZipsWith({...searchParams: ISearchParams})

This method will let you search for any optional combination of criteria involving city, county, stateName, stateAbbreviation, military classification, and population count.

```ts
// To return an array of results matching the state abbreviation FL with population greather than 27000.
const searchResults = lookupZipsWith({
  stateAbbreviation: 'FL',
  population: 27000,
  populationOperator: '>',
});
```

You can optionally use any combination of these settings exposed on the interface.

```ts
interface ISearchParams {
  city?: string;
  county?: string;
  stateName?: string;
  stateAbbreviation?: string;
  militaryZip?: boolean;
  population?: number;
  populationOperator?: '<' | '>' | '=';
}
```

### distanceBetweenZips(firstZipCode: string, secondZipCode: string, distanceInMiles = true)

Provided two zip codes, distanceBetweenZips will return the direct distance between their associated latitude and longitude taking into account the approximate curvature of the Earth.

```ts
const newYork = '10001';
const losAngeles = '90001';

const distanceInMiles = distanceBetweenZips(newYork, losAngeles, true); // --> 2448.350696991183
const distanceInKilometers = distanceBetweenZips(newYork, losAngeles, false); // --> 3940.239723114183
```

## Available Properties

The following demographic information is exposed in the ZipCode result objects returned singly or in array form from the searchBy method.

```ts
{
  'zip': string;
  'latitude': number;
  'longitude': number;
  'city': string;
  'stateName': string;
  'stateAbbreviation': string;
  'zcta': boolean;
  'parent_zcta': string;
  'population': number | null;
  'density': number | null;
  'county_fips': number;
  'county': string;
  'county_weights': any;
  'county_names_all': string;
  'county_fips_all': string;
  'imprecise': boolean;
  'militaryZip': boolean;
  'timezone': string;
}
```
