import express, { Request, Response, application } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

interface Puppy {
  id: string;
  breed: string;
  name: string;
  birth_date: string;
}

let puppies: Puppy[] = [
  {
    id: uuidv4(),
    breed: 'Golden Retriever',
    name: 'Bob',
    birth_date: '19-02-2008'
  },
  {
    id: uuidv4(),
    breed: 'Bulldog',
    name: 'Samson',
    birth_date: '01-05-2001'
  },
  {
    id: uuidv4(),
    breed: 'Dachshund',
    name: 'Gertje',
    birth_date: '07-05-2012'
  },
]

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  res.json(puppies);
});

app.get('/api/puppies/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const puppy = puppies.find(p => p.id === id);

  if (puppy) {
    res.json(puppy);
  } else {
    res.status(404)
      .json({ message: 'Puppy not found' });
  }
});

app.post('/api/puppies', (req: Request, res: Response) => {
  const { breed, name, birth_date } = req.body;

  const puppy: Puppy = { id: uuidv4(), breed, name, birth_date};

  puppies.push(puppy);

  res.status(201).json(puppies);
});

app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const { breed, name, birth_date } = req.body;
  const index = puppies.findIndex(p => p.id === id);

  if (index >= 0) {
    puppies[index] = { ...puppies[index], breed, name, birth_date };
    res.json(puppies);
  } else {
    res
      .status(404)
      .json({ message: 'Puppy not found'});
  }
});

app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const index = puppies.findIndex(p => p.id === id);

  if (index >= 0) {
    puppies.splice(index, 1);
    res.json(puppies);
  } else {
    res
      .status(404)
      .json({ message: 'Puppy not found'});
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});