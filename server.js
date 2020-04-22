const express = require('express')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000

//read in environment variables from .env
dotenv.config()

//establish db connection object
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

//serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

//allow external calls
app.use((req,res,next) => {
   res.header('Access-Control-Allow-Origin', '*')
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
   next()
})

//enable body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//return project at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

//return all listings
app.get('/api/all', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Listings;');
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send('Error '+err);
    }
})

//return active listings
app.get('/api/active', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Listings WHERE removed=false ORDER BY id ASC;');
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send('Error '+err);
    }
})

//return removed listings
app.get('/api/removed', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Listings WHERE removed=true;');
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send('Error '+err);
    }
})

//receive new listings
app.post('/api/post', async (req, res) => {
    try {
        console.log(req.body);
        const client = await pool.connect();
        const result = await client.query('INSERT INTO Listings VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,DEFAULT,DEFAULT,$12)',
                                          [req.body.address,req.body.nickname || null,req.body.img || null,req.body.rent,req.body.sqft,req.body.beds,req.body.baths,req.body.inunit === "on" ? "true" : "false",req.body.transitpublic || null,req.body.transitfoot || null,req.body.details || null,req.body.link]);
        res.send("Success");
    } catch(err) {
        console.log(err);
        res.send(err);
    }
    next();
})

//log to console the active server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
