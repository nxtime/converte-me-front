import { IBaseDTO } from "./baseDTO";
import { IUserBase } from "./usersDTO";

export interface IFollowersDTO extends IBaseDTO {
  follower: IUserBase;
  following: IUserBase;
}
