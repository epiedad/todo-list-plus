"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
exports.todoRouter = router;
router.get("/todos", todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
router.put("/edit-todo/:id", todos_1.updateTodo);
router.delete("/delete-todo/:id", todos_1.deleteTodo);
//# sourceMappingURL=index.js.map