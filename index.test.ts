import { describe, expect, test } from '@jest/globals';
import { random, searchBy } from './index';
import ZipCode from './models/ZipCode';
import { zipCodes } from './zip-source-files/us-zip-codes';
import { ISearchParams } from './models/ISearchParams';

describe('ZipCodeLookup', () => {
  describe('random()', () => {
    test('should not normally return the same zip', () => {
      let r1 = random();
      let r2 = random();

      expect(r1).not.toEqual(r2);
    });
    test('will return a single element with expected structure', () => {
      let rZip = random();
      expect(rZip).toBeInstanceOf(ZipCode);
    });
  });
  describe('searchBy()', () => {
    test('should return more than 1 result for Miami, FL', () => {
      let searchParams: ISearchParams = {
        city: 'Miami',
        stateAbbreviation: 'FL',
      };
      let searchResult = searchBy(searchParams);

      expect(searchResult.length).toBeGreaterThan(1);
    });
    test('should return 0 results for a population number larger than world population', () => {
      let results = searchBy({
        population: 1000000000000,
        populationOperator: '>',
      });

      expect(results).toHaveLength(0);
    });
    test('should return all non-null population results when searching populations less than 1 trillion people', () => {
      let results = searchBy({
        population: 1000000000000,
        populationOperator: '<',
      });

      const allZipCodesLength = zipCodes.filter((zip) => zip.population).length;
      expect(results).toHaveLength(allZipCodesLength);
    });
    test('will return results with null population', () => {
      let result = searchBy({
        stateName: 'Virgin Islands',
      });

      expect(result.length).toBeGreaterThan(0);
    });
    test('will return results with the exact equal population', () => {
      let result = searchBy({ population: 2801, populationOperator: '=' });
      expect(result).toHaveLength(4);
    });
    test('will return results with the exact equal population and city', () => {
      let result = searchBy({
        population: 2801,
        populationOperator: '=',
        city: 'Huntington',
      });
      expect(result).toHaveLength(1);
      expect(result[0].city).toEqual('Huntington');
    });
    test('Will return results when population operator specified but not population value', () => {
      let result = searchBy({ populationOperator: '=', county: 'St. Thomas' });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].population).toBeNull();
      expect(result[0].county).toEqual('St. Thomas');
      expect(result[0].stateName).toEqual('Virgin Islands');
    });
  });
});
