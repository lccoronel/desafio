import { Response, Request } from "express";
import CreateCourceService from "./CreateCourceService";

export function createCourse(request: Request, response: Response) {
  CreateCourceService.execute({ name: "NodeJS", duration: 10, educator: "Dani"});

  return response.send();
}