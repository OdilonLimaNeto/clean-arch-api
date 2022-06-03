import { HttpRequest, HttpResponse } from "./http";

type Controller = {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
};
export default Controller;
