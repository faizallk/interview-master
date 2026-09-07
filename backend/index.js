require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./src/config/database")
const authRouter = require('./src/routes/auth.route')
const cookieParser = require("cookie-parser")
const cors = require("cors");
//Connection of MongoDB
connectDB();
// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))
// Auth routes
app.use('/api/auth', authRouter);


//project start point
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

