import { IBaseDTO } from "./baseDTO";
import { IUserBase } from "./usersDTO";

export interface ICommentsBase extends IBaseDTO {
  content: string;
  userId: number;
  postId: number;
}

export interface ICommentsDTO extends ICommentsBase {
  user: IUserBase,
}
