const TodoController = require("../../controller/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks  = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

// section 8
const todoId = '5df05b794d344d03386d0a58'

// TodoModel.create = jest.fn();
// TodoModel.find = jest.fn();
// TodoModel.findById = jest.fn()
// TodoModel.findByIdAndUpdate = jest.fn()
// TodoModel.findByIdAndDelete = jest.fn()

jest.mock("../../model/todo.model")
// jest.mock(TodoModel)

let req, res, next;
beforeEach(() =>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

//section 9 
describe('TodoController.deleteId', () => {
    it('should have return function', () => {
        expect(typeof TodoController.deleteId).toBe("function")
    });
    it('should call findByIdAndDelete',  async () => {
        req.params.todoId = todoId
        await TodoController.deleteId(req, res, next)

        expect(TodoModel.findByIdAndDelete).toBeCalledWith(todoId)
    });
    it('should return handle 200 and delete todoModel', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(newTodo)
        await TodoController.deleteId(req, res, next)

        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newTodo)
        expect(res._isEndCalled()).toBeTruthy()
    });

    it('should error handling 404', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(null)
        await TodoController.deleteId(req, res, next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    });
});

// section 8 
describe('TodoController.updateTodo', () => {
    it('should have return function', () => {
        expect(typeof TodoController.updateTodo).toBe("function")
    });

    it.skip('should call todoUpdate.findByIdAndUpdate', async () => {
        req.params.todoId = todoId
        req.body = newTodo
        await TodoController.updateTodo(res, req, next)
        // TodoModel.findByIdAndUpdate(todoId, newTodo, {
        //     new: true,
        //     useFindAndModify: false
        // })
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
            new: true,
            useFindAndModify: false
        });
    });
    it('should return response json body and code response 200', async () => {
        req.params.todoId = todoId
        req.body = newTodo
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo)
        await TodoController.updateTodo(req,res,next)

        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newTodo)
        expect(res._isEndCalled()).toBeTruthy()
    });
    it('should error handling returns error', async () =>  {
        const errorMessageUpdate = { message: "Error finding"};
        const rejectedPromise = Promise.reject(errorMessageUpdate);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)

        await TodoController.updateTodo(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessageUpdate)

    });
    it('should handle returns error 404', async () =>  {
        TodoModel.findByIdAndUpdate.mockReturnValue(null)
        await TodoController.updateTodo(req, res, next)

        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()

    });
});

//section 7 with describe
describe('TodoController.getTodoId', () => {
    it('should have getTodoById', () => {
        expect(typeof TodoController.getTodos).toBe("function")
    });

    it('should call todoModel.findbyId with routes parameters', async () => {
        // req.params.todoId = '5df05b794d344d03386d0a58' section 7
        req.params.todoId = todoId // section 8 
        await TodoController.getTodoId(req, res, next)
        // expect(TodoModel.findById).toBeCalledWith('5df05b794d344d03386d0a58')
        expect(TodoModel.findById).toBeCalledWith(todoId)
    });

    it('should return response json body and code response 200', async () => {
        TodoModel.findById.mockReturnValue(newTodo)
        await TodoController.getTodoId(req,res,next)

        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newTodo)
        expect(res._isEndCalled()).toBeTruthy()
    });

    it('should handle errors in getTodoId', async () => {
        const errorMessage = { message: 'error finding todoModel'}
        const rejectedPromise = Promise.reject(errorMessage)
        TodoModel.findById.mockReturnValue(rejectedPromise)
        await TodoController.getTodoId(req, res, next)

        expect(next).toHaveBeenCalledWith(errorMessage)

    });

    it('should handle return 404 when item doesnt exist', async () => {
        TodoModel.findById.mockReturnValue(null)
        await TodoController.getTodoId(req, res, next)

        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    });

});

// section 6
describe("TodoController.getTodos",() => {
    it('should have a getTodos function', () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });
    it("should call TodoModel.find({})", async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });
    it('should return response with status 200 and all todos', async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it('should handle errors in getTodos', async () => {
        const errorMessage = { message: "Error finding"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(res, req, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

});

describe("TodoController.createTodo", () => {
    beforeEach(()=> {
        req.body = newTodo;
    })
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe("function")
    });
    it('should call TodoModel.create', () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });
    it('should return 201 response code', async ()=> {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy()
    });
    it('should return json body in response', async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req,res,next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it('should handle errors', async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})

// describe("* Testing Maths", () => {
//     it("should return a number of 5", () => {
//        const x = 5;
//        const y = 0;
//        const expectedResult = 5;
//        expect(x + y).toEqual(expectedResult);
//        expect(typeof (x + y)).toBe("number");
//     });
// });