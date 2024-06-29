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
    lat: string;
    lng: string;
    city: string;
    state_id: string;
    state_name: string;
    zcta: string;
    parent_zcta: string;
    population: string | null;
    density: string | null;
    county_fips: string;
    county_name: string;
    county_weights: any;
    county_names_all: string;
    county_fips_all: string;
    imprecise: string;
    military: string;
    timezone: string;
  }) {
    this.city = zipObj.city;
    this.county_fips = parseInt(zipObj.county_fips);
    this.county_fips_all = zipObj.county_fips_all;
    this.county = zipObj.county_name;
    this.county_names_all = zipObj.county_names_all;
    this.county_weights = zipObj.county_weights;
    this.density = zipObj.density ? parseFloat(zipObj.density) : null;
    this.imprecise = zipObj.imprecise.toLowerCase() === 'true';
    this.latitude = parseFloat(zipObj.lat);
    this.longitude = parseFloat(zipObj.lng);
    this.militaryZip = zipObj.military.toLowerCase() === 'true';
    this.timezone = zipObj.timezone;
    this.population = zipObj.population ? parseInt(zipObj.population) : null;
    this.parent_zcta = zipObj.parent_zcta;
    this.zcta = zipObj.zcta.toLowerCase() === 'true';
    this.stateAbbreviation = zipObj.state_id;
    this.stateName = zipObj.state_name;
    this.zip = zipObj.zip;
  }
}

export default ZipCode;
