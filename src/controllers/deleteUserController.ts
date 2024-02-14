import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/usersData";
import { User } from "../models/User";
import { getUserById } from "./getUserByIdController.ts";
import {
  getNewDataCode204,
  invalidDataAboutUserCode400,
  pageNotFoundCode404,
} from "../helpers/statusCode";

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  try {
    const user = await getUserById(req, res) as User;

    if (!user) {
      invalidDataAboutUserCode400(res);
      return;
    }

    const index = dataAllUsers.findIndex((el: { id: any; }) => el.id === user.id);

    if (index === -1) {
      pageNotFoundCode404(res);
      return;
    }

    dataAllUsers.splice(index, 1);
    getNewDataCode204(res);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};