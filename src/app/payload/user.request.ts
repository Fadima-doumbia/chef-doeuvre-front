import { Role } from "../models/role";

export class UserRequest{
  id?: number;
  // username?: string;
  // email?: string;
  // password?: string;
  // role?: string;
  // number?: number;
  // presentation?: string;

  username?: string;
  email?: string;
  password?: string;
  role?: Array<String>;
  number?: number;
  presentation?: string;

}
