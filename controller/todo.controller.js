
const TodoModel = require("../model/todo.model")

exports.createTodo = async (req, res, next) =>  {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        // console.log('201')
        // console.log(err)
        next(err);
    }
}

exports.getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos)
        
    } catch (err) {
        // console.log('200')
        // console.log(err)
        next(err)
    }
    // const getModel = await TodoModel.get(req.body);
};

exports.getTodoId = async (req, res, next) => {
    try {
        const Id = await TodoModel.findById(req.params.todoId)
        if (Id) {
            res.status(200).json(Id)
        } else {
            res.status(404).send()
        }

    } catch (err) {
        next(err)
    }
    // const getModel = await TodoModel.get(req.body);
};

exports.updateTodo = async (req, res, next) => {
    
    try {
        const update = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, { 
            new: true,
            useFindAndModify: false
        })
        console.log('update')
        console.log(req)
        if (update) {
            res.status(200).json(update)
        } else {
            res.status(404).send()
        }
        
    } catch (err) {
        next(err)
    }
}

exports.deleteId = async (req, res, next) => {
    try {
        const deleted = await TodoModel.findByIdAndDelete(req.params.todoId)
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        
    }
}