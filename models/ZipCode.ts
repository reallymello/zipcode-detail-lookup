class ZipCode {
  'zip': string;
  'latitude': number;
  'longitude': number;
  'city': string;
  'state_id': string;
  'state_name': string;
  'zcta': boolean;
  'parent_zcta': string;
  'population': number;
  'density': number;
  'county_fips': number;
  'county_name': string;
  'county_weights': any;
  'county_names_all': string;
  'county_fips_all': string;
  'imprecise': boolean;
  'military': boolean;
  'timezone': string;

  // constructor(
  //   zip: string,
  //   lat: string,
  //   lng: string,
  //   city: string,
  //   state_id: string,
  //   state_name: string,
  //   zcta: string,
  //   parent_zcta: string,
  //   population: string,
  //   density: string,
  //   county_fips: string,
  //   county_name: string,
  //   county_weights: { [key: string]: number },
  //   county_names_all: string,
  //   county_fips_all: string,
  //   imprecise: string,
  //   military: string,
  //   timezone: string
  // ) {
  //   this.city = city;
  //   this.county_fips = parseInt(county_fips);
  //   this.county_fips_all = county_fips_all;
  //   this.county_name = county_name;
  //   this.county_names_all = county_names_all;
  //   this.county_weights = county_weights;
  //   this.density = parseFloat(density);
  //   this.imprecise = imprecise.toLowerCase() === 'true';
  //   this.lat = parseFloat(lat);
  //   this.lng = parseFloat(lng);
  //   this.military = military.toLowerCase() === 'true';
  //   this.timezone = timezone;
  //   this.population = parseInt(population);
  //   this.parent_zcta = parent_zcta;
  //   this.zcta = zcta.toLowerCase() === 'true';
  //   this.state_id = state_id;
  //   this.state_name = state_name;
  //   this.zip = parseInt(zip);
  // }
  constructor(zipObj: {
    zip: string;
    lat: string;
    lng: string;
    city: string;
    state_id: string;
    state_name: string;
    zcta: string;
    parent_zcta: string;
    population: string;
    density: string;
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
    this.county_name = zipObj.county_name;
    this.county_names_all = zipObj.county_names_all;
    this.county_weights = zipObj.county_weights;
    this.density = parseFloat(zipObj.density);
    this.imprecise = zipObj.imprecise.toLowerCase() === 'true';
    this.latitude = parseFloat(zipObj.lat);
    this.longitude = parseFloat(zipObj.lng);
    this.military = zipObj.military.toLowerCase() === 'true';
    this.timezone = zipObj.timezone;
    this.population = parseInt(zipObj.population);
    this.parent_zcta = zipObj.parent_zcta;
    this.zcta = zipObj.zcta.toLowerCase() === 'true';
    this.state_id = zipObj.state_id;
    this.state_name = zipObj.state_name;
    this.zip = zipObj.zip;
  }
}

export default ZipCode;
