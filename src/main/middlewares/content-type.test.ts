import { Request, Response } from "express";
import request from "supertest";
import app from "../configurations/app";

describe("Content Type Middleware", () => {
  it("Should return default content type as json", async () => {
    app.get("/test_content_type", (request: Request, response: Response) => {
      response.send("");
    });
    await request(app).get("/test_content_type").expect("content-type", /json/);
  });

  it("Should return xml content type when", async () => {
    app.get(
      "/test_content_type_xml",
      (request: Request, response: Response) => {
        response.type("xml");
        response.send("");
      }
    );
    await request(app)
      .get("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
