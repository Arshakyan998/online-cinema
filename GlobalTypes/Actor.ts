import { IFilms } from "./Film";

 

export interface IActor {
  age: number;
  birthday: Date;
  birthplace: string;
  death: null | Date;
  deathplace: null | string;
  growth: number;
  hasAwards: number;
  nameEn: string;
  nameRu: string;
  personId: string;
  posterUrl: string;
  profession: string;
  sex: string;
  films:IFilms[]
}
