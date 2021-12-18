import { Role } from "../models/role";

export class UserRequest{
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  presentation?: string;

  // username?: string;
  // email?: string;
  // password?: string;
  // role?: Array<String>;
  // presentation?: string;
}
