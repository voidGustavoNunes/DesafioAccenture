export class Cep{
  code: string;
  state: string;
  city: string;
  district: string;
  address: string;

  constructor(
    code: string,
    state: string,
    city: string,
    district: string,
    address: string
  ){
    this.code = code;
    this.state = state;
    this.city = city;
    this.district = district;
    this.address = address;
  }
}
