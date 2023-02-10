//create an express server
const express = require('express');
const router = require('./routes/user.route');
const authRouter = require('./routes/login.route');
require('dotenv').config();
const projectRouter = require('./routes/project.route');

//add swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use('/api', router);
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//for the engagements
app.use('/api/projects', projectRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//start a server on port 8000
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
