const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./src/config/database")
const authRouter = require('./src/routes/auth.route')
const cookieParser = require("cookie-parser")
const cors = require("cors");
const interveiwRouter = require('./src/routes/interview.route')
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
app.use('/api/interview', interveiwRouter)

//project start point
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

