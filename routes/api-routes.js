// ***************************************************************
// api-routes.js - routes for displaying and saving data to the db
// ****************************************************************

// Dependencies
// =============================================================
const db = require('../models');


// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the todos
  app.get('/api/todos', async (req, res) => {
    const results = await db.Todo.findAll({});
    res.json(results);
  });

  // POST route for saving a new todo.
  // We can create a todo using the data on req.body
  app.post('/api/todos', async (req, res) => {
    console.log('Chirp Data:');
    console.table(req.body);

    const result = await db.Todo.create({
      text: req.body.text,
      complete: req.body.boolean,
    });
    res.json({id: result.insertId});
  });

  // DELETE route for deleting todos.
  // We can access the ID of the todo to delete in
  // req.params.id
  app.delete('/api/todos/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.Todo.destroy({
      where: {id: id},
    });

    res.json(result);
  });

  // PUT route for updating todos.
  // We can access the updated todo in req.body
  app.put('/api/todos', async (req, res) => {
    const update = await db.Todo.update({
      text: req.body.text,
      complete: req.body.complete,
    }, {
      where: {id: req.body.id},
    });
    res.json(update);
  });
};
