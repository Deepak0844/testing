import express from 'express';
import {
  pizzaList,
  addPizza,
  addCart,
  cartList,
  getPizzaById,
  deleteItem,
  checkOut,
  succesful,
} from "./Helper.js";
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

app.get("/pizza",async(request, response) => {
    const result = await pizzaList();
     response.send(result);
})

app.post("/pizza",async(request, response) => {
    const data = request.body;
        const result = await addPizza(data);
        response.send(result);
})



app.listen(PORT,()=>{ console.log("Server started", PORT) })
