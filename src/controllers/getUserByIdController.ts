import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/usersData";
import { validate as uuidValidate } from "uuid";
import { User } from "./../models/User";
import {
  getOrUpdateDataCode200,
  pageNotFoundCode404,
  userIdInvalidCode400,
  userNotFoundCode404,
} from "../helpers/statusCode";

export const getUserById = (
  req: IncomingMessage,
  res: ServerResponse,
): User | undefined => {
  if (!req.url || !req.url.startsWith("/api/users/")) {
    pageNotFoundCode404(res);
    return;
  }

  const userId: string = req.url.split("/")[3];

  if (!uuidValidate(userId)) {
    userIdInvalidCode400(res);
    return;
  }

  const user: User | undefined = dataAllUsers.find((el: User) => el.id === userId);

  if (!user) {
    userNotFoundCode404(res);
    return;
  }

  if (req.method === "GET") {
    getOrUpdateDataCode200(res, user);
    return;
  }

  return user;
};