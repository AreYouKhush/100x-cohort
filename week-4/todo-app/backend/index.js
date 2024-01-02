const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const userRouter = require("./routes/user")
const todoRouter = require("./routes/todo")

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
