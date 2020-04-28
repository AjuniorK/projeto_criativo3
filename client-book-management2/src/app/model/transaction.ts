import {Book} from "./book";
import {User} from "./user";


export class Transaction {
  id: number;
  book: Book;
  user: User;
  tradeDate: any;
}
