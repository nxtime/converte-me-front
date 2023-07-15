import { IBaseDTO } from "./baseDTO";
import { ICommentsBase } from "./commentsDTO";
import { IFollowersDTO } from "./followersDTO";
import { IPostBase } from "./postsDTO";


export interface IUserBase extends IBaseDTO {
  firstName: string;
  lastName: string;
  avatar_url: string;
  date_of_birth: string;
  email: string;
  gender: "not specified" | "male" | "female",
}

export interface IUserDTO extends IUserBase {
  posts: IPostBase[],
  comments: ICommentsBase[],
  followers: IFollowersDTO[],
  following: IFollowersDTO[]
}
