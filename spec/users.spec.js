import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { cleanUpDatabase, disconnectFromDatabase, generateValidJwt } from "./utils.js";
import User from "../models/user.js";

beforeEach(cleanUpDatabase);
afterAll(disconnectFromDatabase);

describe("POST /users", function() {
  test("it should create a user", async function() {
    const res = await supertest(app)
      .post('/users')
      .send({
        name: 'John Doe',
        password: '1234'
      })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "John Doe"
      })
    );

    expect(res.body).toBeObject();
    expect(res.body.id).toBeString();
    expect(res.body.name).toEqual('John Doe');
    expect(res.body).toContainAllKeys(['id', 'name']);
  });
});

describe("GET /users", function() {
  let johnDoe;
  let janeDoe;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    [ johnDoe, janeDoe ] = await Promise.all([
      User.create({ name: 'John Doe', password: '1234' }),
      User.create({ name: 'Jane Doe', password: '2345' })
    ]);
  });

  test("it should return the list of users", async function() {
    const token = await generateValidJwt(johnDoe);
    const res = await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveLength(2);

    expect(res.body[0]).toBeObject();
    expect(res.body[0].id).toEqual(janeDoe.id);
    expect(res.body[0].name).toEqual('Jane Doe');
    expect(res.body[0]).toContainAllKeys(['id', 'name']);

    expect(res.body[1]).toBeObject();
    expect(res.body[1].id).toEqual(johnDoe.id);
    expect(res.body[1].name).toEqual('John Doe');
    expect(res.body[1]).toContainAllKeys(['id', 'name']);
  });
});