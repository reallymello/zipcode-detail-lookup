class ZipCode {
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

  constructor(zipObj: {
    zip: string;
    latitude: number;
    longitude: number;
    city: string;
    stateAbbreviation: string;
    stateName: string;
    zcta: boolean;
    parent_zcta: string;
    population: number | null;
    density: number | null;
    county_fips: number;
    county: string;
    county_weights: any;
    county_names_all: string;
    county_fips_all: string;
    imprecise: boolean;
    militaryZip: boolean;
    timezone: string;
  }) {
    this.city = zipObj.city;
    this.county_fips = zipObj.county_fips;
    this.county_fips_all = zipObj.county_fips_all;
    this.county = zipObj.county;
    this.county_names_all = zipObj.county_names_all;
    this.county_weights = zipObj.county_weights;
    this.density = zipObj.density;
    this.imprecise = zipObj.imprecise;
    this.latitude = zipObj.latitude;
    this.longitude = zipObj.longitude;
    this.militaryZip = zipObj.militaryZip;
    this.timezone = zipObj.timezone;
    this.population = zipObj.population;
    this.parent_zcta = zipObj.parent_zcta;
    this.zcta = zipObj.zcta;
    this.stateAbbreviation = zipObj.stateAbbreviation;
    this.stateName = zipObj.stateName;
    this.zip = zipObj.zip;
  }
}

export default ZipCode;
