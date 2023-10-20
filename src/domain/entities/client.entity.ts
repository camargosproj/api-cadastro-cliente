import { Address } from "./address.entity";

export class Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}
