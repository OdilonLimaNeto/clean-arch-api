import { HttpResponse } from "./http";

type ErrorHandler = {
  handle: (error: any) => HttpResponse;
};

export default ErrorHandler;
