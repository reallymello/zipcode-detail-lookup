import { describe, expect, test } from '@jest/globals';
import { randomZip, lookupZipsWith, lookupZip } from './index';
import ZipCode from './models/ZipCode';
import { zipCodes } from './zip-source-files/us-zip-codes';
import { ISearchParams } from './types/ISearchParams';

describe('ZipCodeLookup', () => {
  describe('random()', () => {
    test('should not normally return the same zip', () => {
      let r1 = randomZip();
      let r2 = randomZip();

      expect(r1).not.toEqual(r2);
    });
    test('will return a single element with expected structure', () => {
      let rZip = randomZip();
      expect(rZip).toBeInstanceOf(ZipCode);
    });
  });
  describe('zip()', () => {
    test('will return the specific zip code object', () => {
      let result = lookupZip('10017');

      expect(result).toBeInstanceOf(ZipCode);
      expect(result?.zip).toBeDefined();
      expect(result?.zip).toEqual('10017');
      expect(result).toEqual({
        city: 'New York',
        county_fips: 36061,
        county_fips_all: '36061',
        county: 'New York',
        county_names_all: 'New York',
        county_weights: '{"36061": 100}',
        density: 18775.3,
        imprecise: false,
        latitude: 40.75235,
        longitude: -73.9726,
        militaryZip: false,
        timezone: 'America/New_York',
        population: 14486,
        parent_zcta: '',
        zcta: true,
        stateAbbreviation: 'NY',
        stateName: 'New York',
        zip: '10017',
      });
    });
    test('will return null if zip was not found', () => {
      let result = lookupZip('nope');

      expect(result).toBeNull();
    });
  });
  describe('searchBy()', () => {
    test('should return more than 1 result for Miami, FL', () => {
      let searchParams: ISearchParams = {
        city: 'Miami',
        stateAbbreviation: 'FL',
      };
      let searchResult = lookupZipsWith(searchParams);

      expect(searchResult.length).toBeGreaterThan(1);
    });
    test('should return 0 results for a population number larger than world population', () => {
      let results = lookupZipsWith({
        population: 1000000000000,
        populationOperator: '>',
      });

      expect(results).toHaveLength(0);
    });
    test('should return all non-null population results when searching populations less than 1 trillion people', () => {
      let results = lookupZipsWith({
        population: 1000000000000,
        populationOperator: '<',
      });

      const allZipCodesLength = zipCodes.filter((zip) => zip.population).length;
      expect(results).toHaveLength(allZipCodesLength);
    });
    test('will return results with null population', () => {
      let result = lookupZipsWith({
        stateName: 'Virgin Islands',
      });

      expect(result.length).toBeGreaterThan(0);
    });
    test('will return results with the exact equal population', () => {
      let result = lookupZipsWith({
        population: 2801,
        populationOperator: '=',
      });
      expect(result).toHaveLength(4);
    });
    test('will return results with the exact equal population and city', () => {
      let result = lookupZipsWith({
        population: 2801,
        populationOperator: '=',
        city: 'Huntington',
      });
      expect(result).toHaveLength(1);
      expect(result[0].city).toEqual('Huntington');
    });
    test('Will return results when population operator specified but not population value', () => {
      let result = lookupZipsWith({
        populationOperator: '=',
        county: 'St. Thomas',
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].population).toBeNull();
      expect(result[0].county).toEqual('St. Thomas');
      expect(result[0].stateName).toEqual('Virgin Islands');
    });
  });
});
