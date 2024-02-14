import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { dataAllUsers } from '../helpers/usersData'
import { getBodyRequest } from '../helpers/getRequestOfBody';
import { User } from './../models/User';
import { isBodyDataValid } from '../helpers/dataValidation';


const getStatusCode = (validData: boolean, res: ServerResponse) => {
  if (validData) {
    return 400;
  }
  return 422;
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  if (req.url === "/api/users") {
    try {
      const body: User = await getBodyRequest(req, res);
      const { username, age, hobbies } = body;

      const validData = isBodyDataValid(username, age, hobbies);

      if (!validData || !username || !age || !hobbies) {
        const statusCode = getStatusCode(validData, res);
        res.statusCode = statusCode;
        res.end(JSON.stringify({ error: "Invalid data provided" }));
        return;
      }

      const id = uuidv4();

      const newUserData: User = { id, username, age, hobbies };

      dataAllUsers.push(newUserData);

      res.statusCode = 201;
      res.end(JSON.stringify(dataAllUsers));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
};