const express = require('express')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const { Pool } = require('pg')
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
   next()
})

//return project at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

//return listings at endpoint
app.get('/api', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Listings;');
        res.send((result) ? result.rows : null);
    } catch(err) {
        console.log(err);
        res.send('Error '+err);
    }
})

//log to console the active server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
