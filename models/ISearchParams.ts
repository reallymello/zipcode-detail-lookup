export interface ISearchParams {
  city?: string;
  county?: string;
  stateName?: string;
  stateAbbreviation?: string;
  militaryZip?: boolean;
  population?: number;
  populationOperator?: '<' | '>' | '=';
}
