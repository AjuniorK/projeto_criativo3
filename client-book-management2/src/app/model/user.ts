import {Role} from './role';

export class User {
  id: number;
  login: string="";
  senha: string="";
  profissao: string="";
  nome: string="";
  escola: string="";
  role: Role;
}
