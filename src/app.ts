import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import connect from './db/connect';
import checkListRoutes from './routes/checkList'

//configure port and hostnames
const port = 3000
const host = 'localhost'

// main express app 
const app = express();

//json parse middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/checkList', checkListRoutes);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  next(error);
});
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: error.message,
  });
});

//db connection and app start message
app.listen(port, host, () => {
  console.log(`Server Running at http://${host}:${port}`);
  connect();
})