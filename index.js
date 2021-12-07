import express from 'express';
// import { authRouter} from './routes/authRoutes.js';
// import { pizzaApp} from './routes/pizzaApp.js';
import {MongoClient} from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
  async function createConnections(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();  //promise
  console.log("mongodb connected");
  return client;
}
export const client = await createConnections();

//routes

app.get("/home",async(request, response) => {
    response.send("home page");
  })
// app.use("/user",authRouter);//middleware

app.listen(PORT,()=>{ console.log("Server started", PORT) })
