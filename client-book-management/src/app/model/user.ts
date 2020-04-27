import {Role} from './role';

export class User {
  id: number;
  login: String="";
  senha: String="";
  profissao: String="";
  nome: String="";
  escola: String="";
  role: Role;
}
