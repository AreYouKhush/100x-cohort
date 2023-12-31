const express = require('express');
const bodyParser = require('body-parser');
const todos = require('./todos.json');
const fs = require('node:fs');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

function writeToFile(){
    fs.writeFile('./todos.json', JSON.stringify(todos), (err) => {
        if(err){
            console.log(err);
            return;
        }else{
            console.log("SUCCESSFULLY WRITTEN IN FILE")
        }
    })
}

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const findTodo = todos.find(item => item.id == id);
  if(!findTodo){
    res.status(404).send();
  }else{
    res.status(200).json(findTodo);
  }
})

app.post('/todos', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  console.log({title, description});
  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: title,
    description: description
  }
  todos.push(newTodo);
  writeToFile(todos);
  res.status(201).json(newTodo);
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(item => item.id == id);
  if(index === -1){
    res.status(404).send();
  }else{
    todos[index].title = req.body.title;
    todos[index].description = req.body.description;
    writeToFile(todos);
    res.status(200).json(todos[index]);
  }
})

app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(item => item.id == id);
  if(index === -1){
    res.status(404).send();
  }else{
    todos.splice(index, 1);
    writeToFile(todos);
    res.status(200).json();
  }
})

app.get('/*', (req, res) => {
  res.sendStatus(404);
})

// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// })

module.exports = app;