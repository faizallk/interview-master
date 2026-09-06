require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./src/config/database")
const authRouter = require('./src/routes/auth.route')
const cookieParser = require("cookie-parser")
//Connection of MongoDB
connectDB();
// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser())
// Auth routes
app.use('/api/auth', authRouter);


//project start point
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

