import { IBaseDTO } from "./baseDTO";
import { ICommentsBase } from "./commentsDTO";
import { IUserBase } from "./usersDTO";

export interface IPostBase extends IBaseDTO {
  title: string;
  content: string;
  userId: number;
}

export interface IPostDTO extends IPostBase {
  user: IUserBase,
  comments: ICommentsBase[]
}
