const express = require('express');
const app = express();

const routs = require('./routes/root');
const connectDB = require('./db/connect');
require('dotenv').config();


app.use(express.json());
app.use('/api/v1/tasks', routs);



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.log(error);
  }
};

start();