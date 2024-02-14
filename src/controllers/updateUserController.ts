import { IncomingMessage, ServerResponse } from 'http';
import { dataAllUsers } from '../helpers/usersData';
import { getBodyRequest } from '../helpers/getRequestOfBody';
import { User } from '../models/User';
import { getUserById } from './getUserByIdController';
import {
  getOrUpdateDataCode200,
  invalidDataAboutUserCode400,
  pageNotFoundCode404,
} from "../helpers/statusCode";
import { isBodyDataValid } from '../helpers/dataValidation';

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  if (!req.url?.startsWith("/api/users/")) {
    pageNotFoundCode404(res);
    return;
  }

  try {
    const user = getUserById(req, res) as User;

    if (!user) {
      pageNotFoundCode404(res);
      return;
    }

    const newBodyReq: User = await getBodyRequest(req, res);
    const { username, age, hobbies } = newBodyReq;

    const isValidData = isBodyDataValid(username, age, hobbies);
    if (!isValidData || !username || !age || !hobbies) {
      invalidDataAboutUserCode400(res);
      return;
    }

    dataAllUsers.forEach((el) => {
      if (el.id === user.id) {
        el.username = username;
        el.age = age;
        el.hobbies = hobbies;
      }
    });

    getOrUpdateDataCode200(res, dataAllUsers);
  } catch (error) {
    pageNotFoundCode404(res);
  }
};
