import { ServerResponse } from "http";
import { User } from '../models/User';

export const getOrUpdateDataCode200 = (
  res: ServerResponse,
  data: User | [] | string | {},
) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const getCreatedDataCode201 = (res: ServerResponse, data: User[]) => {
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
export const getNewDataCode204 = (res: ServerResponse) => {
  res.writeHead(204, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User deleted" }));
};

export const invalidDataAboutUserCode400 = (res: ServerResponse): void => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end();
};

export const notValidDataAboutUserCode400 = (res: ServerResponse) => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message:
        "Invalid data. Check information: username must be a string, age must be a number and more than 0, hobbies must be an array with or without string information",
    }),
  );
};

export const userIdInvalidCode400 = (res: ServerResponse) => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "UserId is invalid" }));
};

export const requestNotFoundCode400 = (res: ServerResponse) => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Request not found" }));
};

export const pageNotFoundCode404 = (res: ServerResponse): void => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Page not found" }));
};

export const userNotFoundCode404 = (res: ServerResponse) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User not found" }));
};

export const invalidIncomingDataCode400 = (res: ServerResponse) => {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Invalid incoming data" }));
};
