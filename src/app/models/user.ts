import { Projet } from "./projet.model";
import { Role } from "./role";

export class User{
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  roles?: Array<Role>;
  projects?: Array<Projet>;
  presentation?: string;
 }
