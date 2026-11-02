import User from "../../core/entities/user.entity";
import UserRepositoryInterface from "../../core/repositories/user-repository.interface";
import UserModel from "../model/user.model";
import BaseRepository from "./base.repository";

export default class UserRepository
  extends BaseRepository<User, UserModel>
  implements UserRepositoryInterface {}
