const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./modules/database');
const userRoutes = require('./routes//userroutes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
connectToDatabase();
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
