import { Address } from "./address.entity";
import { Entity } from "./base/entity";

export interface Client extends Entity {
  name: string;
  email: string;
  phone: string;
  address: Address;
}
