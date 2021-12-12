import {ModeratorModel} from "./moderator.model";

export interface PagResModel {
  list: ModeratorModel[];
  pageNo: number;
  perPage: number;
  pagesTotal: number;
}
