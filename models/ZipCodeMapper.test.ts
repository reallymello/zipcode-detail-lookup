import ZipCode from './ZipCode';
import ZipCodeMapper from './ZipCodeMapper';

describe('ZipCodeMapper', () => {
  test('Can construct object from source format', () => {
    const sourceObj = {
      zip: '99999',
      lat: '-9',
      lng: '-8.12',
      city: 'Fakesville',
      state_id: 'AL',
      state_name: 'Alaska',
      zcta: 'True',
      parent_zcta: 'Something ZCTA',
      population: '30129',
      density: '.9',
      county_fips: '1',
      county_name: 'Fake County',
      county_weights: 'Heavy',
      county_names_all: 'West Fake County|East Fake County',
      county_fips_all: '123',
      imprecise: 'True',
      military: 'True',
      timezone: 'Some/thing',
    };

    const mapObj = new ZipCodeMapper(sourceObj);

    expect(mapObj).toBeInstanceOf(ZipCodeMapper);

    expect(mapObj).toEqual({
      zip: '99999',
      latitude: -9,
      longitude: -8.12,
      city: 'Fakesville',
      stateAbbreviation: 'AL',
      stateName: 'Alaska',
      zcta: true,
      parent_zcta: 'Something ZCTA',
      population: 30129,
      density: 0.9,
      county_fips: 1,
      county: 'Fake County',
      county_weights: 'Heavy',
      county_names_all: 'West Fake County|East Fake County',
      county_fips_all: '123',
      imprecise: true,
      militaryZip: true,
      timezone: 'Some/thing',
    });

    const zipCodeObject = new ZipCode(mapObj);
    expect(zipCodeObject).toBeInstanceOf(ZipCode);
    expect(zipCodeObject).toEqual(mapObj);
  });
  test('will handle null denity and population fields', () => {
    const sourceObj = {
      zip: '99998',
      lat: '-9',
      lng: '-8.12',
      city: 'Fakesville',
      state_id: 'AL',
      state_name: 'Alaska',
      zcta: 'True',
      parent_zcta: 'Something ZCTA',
      population: null,
      density: null,
      county_fips: '1',
      county_name: 'Fake County',
      county_weights: 'Heavy',
      county_names_all: 'West Fake County|East Fake County',
      county_fips_all: '123',
      imprecise: 'True',
      military: 'True',
      timezone: 'Some/thing',
    };

    const mapObject = new ZipCodeMapper(sourceObj);

    expect(mapObject.density).toBeNull();
    expect(mapObject.population).toBeNull();
    expect(mapObject).toEqual({
      zip: '99998',
      latitude: -9,
      longitude: -8.12,
      city: 'Fakesville',
      stateAbbreviation: 'AL',
      stateName: 'Alaska',
      zcta: true,
      parent_zcta: 'Something ZCTA',
      population: null,
      density: null,
      county_fips: 1,
      county: 'Fake County',
      county_weights: 'Heavy',
      county_names_all: 'West Fake County|East Fake County',
      county_fips_all: '123',
      imprecise: true,
      militaryZip: true,
      timezone: 'Some/thing',
    });
  });
});
