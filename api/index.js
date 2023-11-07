const express = require('express');
const bodyParse = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const config = require('../config');
const userRouter = require('./components/user/network');
const authRouter = require('./components/auth/network');
const postRouter = require('./components/post/network');
const errors = require('../network/error');

const app = express();

app.use(bodyParse.json());
const swagerDoc = require('./swagger.json');

//Router
app.use('/api/user', userRouter );
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDoc));

app.use(errors);



app.listen(config.api.port,()=>{
    console.log('Api escuchando en el puerto:', config.api.port);
});

