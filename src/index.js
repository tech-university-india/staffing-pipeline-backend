<<<<<<< HEAD
// create an express server
=======
//create an express server
>>>>>>> main
const express = require('express');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/loginRoutes');
require('dotenv').config();
const projectRouter = require('./routes/projectRoutes');

<<<<<<< HEAD

// add swagger documentation
=======
//add swagger documentation
>>>>>>> main
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use('/api', userRouter);
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

<<<<<<< HEAD

// for the engagements
app.use('/api/projects', projectRouter);


=======
//for the engagements
app.use('/api/projects', projectRouter);

>>>>>>> main
app.get('/', (req, res) => {
  res.send('Hello World!');
});

<<<<<<< HEAD

// start a server on port 8000
=======
//start a server on port 8000
>>>>>>> main
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
