import 'dotenv/config';
import { createServer } from 'node:http';
import { IncomingMessage, ServerResponse } from 'http';
import { dataAllUsers } from '../helpers/usersData';
import { createUser } from '../controllers/createUserController';
import { getUserById } from '../controllers/getUserByIdController';
import { updateUser } from '../controllers/updateUserController';
import { deleteUser } from '../controllers/deleteUserController';
import {
  getOrUpdateDataCode200,
  pageNotFoundCode404,
  requestNotFoundCode400,
} from '../helpers/statusCode';

export const PORT: number = Number(process.env.PORT) || 4000;
export const serverRun = createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    if (req.method === "GET") {
      if (req.url === "/api/users") {
        getOrUpdateDataCode200(res, dataAllUsers);
        return;
      } else if (req.url?.startsWith("/api/users/")) {
        getUserById(req, res);
        return;
      }
    }
    if (req.method === "POST") {
      createUser(req, res);
      return;
    }
    if (req.method === "PUT") {
      updateUser(req, res);
      return;
    }
    if (req.method === "DELETE") {
      deleteUser(req, res);
      return;
    }
    if (!req.method?.includes("GET" || "POST" || "PUT" || "DELETE")) {
      return requestNotFoundCode400(res);
    }
    return pageNotFoundCode404(res);
  },
);
