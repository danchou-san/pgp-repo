import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017/';
const dbName = 'puppydb';

app.get('/puppies', async (req: Request, res: Response) => {
  try {
    const client = new MongoClient(uri);

    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('puppies');

    const puppies = await collection.find().toArray();

    res.json(puppies);

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});