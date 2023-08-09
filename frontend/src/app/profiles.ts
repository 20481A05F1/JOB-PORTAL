import { Buffer } from 'buffer';


export interface Profile {
  id: number;
  fullname: string;
  location: string;
  email: string;
  phonenumber: string;
  totalexperience: number;
  resume: Buffer;
}
