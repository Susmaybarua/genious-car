const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const cors = require('cors');
const app = express();
const ObjectId = require ('mongodb').ObjectId;
const port = process.env.PORT || 7000;
// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env
.DB_USER}:${process.env.DB_PASS}@cluster0.guel6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
    //    
      const database = client.db("carMechanic");
      const servicesCollection = database.collection("services");
    //   get api
    app.get('/services', async (req, res)=> {
        const cursor = servicesCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
    });

// get single service

 app.get('/services/:id', async(req,res) =>{
    const id = req.params.id;
    console.log('getting single service', id);
    const query = { _id : ObjectId(id) };
    const service = await servicesCollection.findOne(query);
    // console.log('load id', id);
    res.json(service);
})
    //   API POST
    app.post('/services', async (req, res)=> {
        const service = req.body;
        console.log('hit the post api', service);
        // const service = {
        //     "name": "ENGINE DIAGNOSTIC",
        //     "price": "300",
        //     "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
        //     "img": "https://i.ibb.co/dGDkr4v/1.jpg"
        // }

        const result = await servicesCollection.insertOne(service);
        console.log(result);
        res.json(result);

        // res.send('post hitted')
    });

    // delete api

app.delete('/services/:id', async(req ,res) => {
    const id = req.params.id;
    const query = {_id : ObjectId(id)};

    const result = await servicesCollection.deleteOne(query);
        res.json(result);
     
})
}

    finally {
        //   await client.close();
        }
}
run().catch(console.dir);

app.get('/',(req, res) => {
    res.send ('hello from module-65');
});

app.get('/hello', (req, res) => {
    res.send('hello updated here')
})
// uSRemy3wwfHbq3vz
// 58.145.186.251
app.listen(port, () => {
    console.log('Running genius car',port);
})