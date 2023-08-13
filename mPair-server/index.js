const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const jwt = require('jsonwebtoken');

//! middleware
app.use(cors());
app.use(express.json());

// ! verify Jwt token
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).send({ error: true, message: "Unauthorized access" });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send({ error: true, message: "Forbidden access" });
      }
      req.decoded = decoded;
      next();
  });
}

// db connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nsyuaxc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const taskCollection = client.db('mPair').collection('users');

    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      // console.log(process.env.ACCESS_TOKEN_SECRET)
      res.send({ token })
  });

    // get all user from the db
    app.get('/users',verifyJWT, async (req, res) => {
      const cursor = taskCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // get user by matching email and password
    app.get('/user/:email/:password', async (req, res) => {
      const { email, password } = req.params;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
    
      try {
        const user = await taskCollection.findOne({ email, password });
        
        if (!user) {
          return ;
        }
        else{
        const { _id, password: userPassword, ...userData } = user;
        res.json(userData);}
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    



    // put user to the db
    app.put('/users', async (req, res) => {
      const newUser = req.body;
      const existingUser = await taskCollection.findOne({ email: newUser.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      const result = taskCollection.insertOne(newUser)
      console.log(result)
      res.json(result);
    });

    // update user status to the db using patch method
    app.patch('/user/:id', async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const result = await taskCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
      res.json(result);
    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send("mPair server is running");
})

app.listen(port, () => {
  console.log(`mPair server is running on port: ${port}`);
})