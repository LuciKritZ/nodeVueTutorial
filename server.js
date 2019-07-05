// Declarations
var express = require('express');
    path = require('path');
    bodyParser = require('body-parser');
    cors = require('cors');
    mongoose = require('mongoose');
    Todo = require('./models/Todo');

// Database connection
mongoose.connect("mongodb://localhost:27017/vuenodedb").then(
    () =>  {console.log("Database connection established successfully.")},
    err => {console.log(`Error while connecting to database due to ${err}`)}
);

// Database configurations
const app = express();
const router = express.Router();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

//Connection
var port = process.env.PORT || 4000;
app.listen( () => {
    console.log(`Listening on port ${port}`);
});

// Express Routes //

// Method: POST
// Desc: Creating a todo
router.route('/create').post((req, res) => {
    var todo = new Todo(req.body);
    todo.save().then(todo => {
        res.status(200).json({'message' : 'Todo added successfully!'});
    })
    .catch(err => {
        res.status(400).json({"message" : `Error while saving to database due to ${err}`});
    });
});

// Method: GET
// Desc: Getting all the todos
router.route('/todos').get((req, res) => {
    Todo.find((err, todos) => {
        if(err){
            console.log(err)
        }
        else {
            res.json(todos);
        }
    });
});

// Method: GET
// Desc: Get todo by id
router.route('/todos/:id').get((req, res) => {
    var id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

// Method: POST
// Desc: Updating a todo by id
router.route('/todos/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo){
            return next(new Error('No Todos found by this id.'))
        }
        else{
            todo.name = req.body.name;
            todo.save().then(todo => {
                res.json('Todo updated successfully.');
            })
            .catch(err => {
                res.status(400).send("Error while updating the todo.")
            });
        }
    });
});

// METHOD: DELETE
// Desc: Deleting a Todo by the id.
router.route('/todos/:id').get((req, res) => {
    Todo.findByIdAndRemove({_id: req.params.id}, (err, today) => {
        if(err) res.join(err);
        else res.json(`Todo ${todo} successfully removed from todos.`);
    });
});