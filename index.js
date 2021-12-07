import express from "express";
import { ObjectId } from "mongodb";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;

const PORT = process.env.PORT;
async function createConnections() {
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("mongodb connected");
  return client;
}
export const client = await createConnections();

//routes

app.get("/home", async (request, response) => {
  response.send("home page");
});

app.get("/pizza", async (request, response) => {
  const result = await client.db("b28wd").collection("pizza").find().toArray();
  response.send(result);
});

app.post("/pizza", async (request, response) => {
  const data = request.body;
  const result = await client.db("b28wd").collection("pizza").insertMany(data);
  response.send(result);
});

app.get("/pizza/:id", async (request, response) => {
  const { id } = request.params;
  const result = await client
    .db("b28wd")
    .collection("pizza")
    .findOne({ _id: ObjectId(id) });
  result
    ? response.send(result)
    : response.status(404).send({ msg: "no found" });
});

app.get("/cart", async (request, response) => {
  const result = await client.db("b28wd").collection("cart").find().toArray();
  response.send(result);
});

app.post("/cart", async (request, response) => {
  const cartItem = request.body;
  const result = await client
    .db("b28wd")
    .collection("cart")
    .insertOne(cartItem);
  response.send(result);
});

app.post("/checkout", async (request, response) => {
  const details = request.body;
  const result = await client
    .db("b28wd")
    .collection("checkout")
    .insertOne(details);
  response.send(result);
});

app.get("/checkout", async (request, response) => {
  const result = await client.db("b28wd").collection("checkout").findOne();
  response.send(result);
});

app.delete("/cart/:id", async (request, response) => {
  const { id } = request.params;
  const result = await client
    .db("b28wd")
    .collection("cart")
    .deleteOne({ _id: ObjectId(id) });
  response.send(result);
});

app.listen(PORT, () => {
  console.log("Server started", PORT);
});
