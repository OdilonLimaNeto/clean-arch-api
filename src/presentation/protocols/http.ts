type HttpResponse = {
  statusCode: number;
  body: any;
};

type HttpRequest = {
  body?: any;
};

export { HttpResponse, HttpRequest };
