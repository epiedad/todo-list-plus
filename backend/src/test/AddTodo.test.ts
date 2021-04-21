import { ITodo } from "../types/todo";
import Todo from "./../models/todo";

import * as dbHandler from "./db";

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe("AddTodo Test", () => {
  it("AddTodo can be created", async () => {
    expect.assertions(2);

    const todo: ITodo = new Todo();

    todo.name = "todo test name";
    todo.status = true;

    await todo.save();

    const todoInDb = await Todo.findOne({ name: "todo test name" }).exec();
    
    expect(todoInDb?.name).toEqual("todo test name");
    expect(todoInDb?.status).toEqual(true);
  });
});
