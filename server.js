const express = require('express');
const app = express();
const {config} = require('./config/server');
const userRouter = require('./routes/users')
const {logErrors, wrapErrors, errorHandler} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler')

app.use(express.json());

app.use('/api', userRouter);
// usersAPI(app);

// Catch 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
});