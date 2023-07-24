import { ELanguage, IBookItem } from "./home.interface";

export interface INetBookReq {
  bookId: string;
  language?: ELanguage;
}

export interface INetBookRes extends IBookItem{
  book: IBookItem;
  recommends: IBookItem[];
  chapter: {
    id: string;
    name: string;
  };
  column: {
    bookId: string;
    bookName: string;
    columnName: string;
  };
  languages: ELanguage[]
}
