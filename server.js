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
        const result = await client.query('SELECT * FROM Listings WHERE removed=false ORDER BY id DESC;');
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

//return removed listings
app.post('/api/filter', async (req, res) => {
    try {
        console.log("New filter request received:",req.body);
        let text = 'SELECT * FROM Listings WHERE removed=false';
        let qParams = [];
        let invalid = false;
        let paramIndex;
        for(let q in req.body) {
            switch(q) {
                case 'beds':
                    paramIndex = qParams.length+1;
                    text += " AND beds>=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'baths':
                    paramIndex = qParams.length+1;
                    text += " AND baths>=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'inunit':
                    paramIndex = qParams.length+1;
                    text += " AND inunit=$"+String(paramIndex);
                    qParams.push(req.body[q] === "on" ? "true" : "false");
                    break;
                case 'contacted':
                    if(req.body[q] !== "all") {
                        paramIndex = qParams.length+1;
                        text += " AND contacted=$"+String(paramIndex);
                        qParams.push(req.body[q]);
                    }
                    break;
                case 'rent-min':
                    paramIndex = qParams.length+1;
                    text += " AND rent>=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'rent-max':
                    paramIndex = qParams.length+1;
                    text += " AND rent<=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'sqft-min':
                    paramIndex = qParams.length+1;
                    text += " AND sqft>=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'sqft-max':
                    paramIndex = qParams.length+1;
                    text += " AND sqft<=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'cta-min':
                    paramIndex = qParams.length+1;
                    text += " AND transitpublic>=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'cta-max':
                    paramIndex = qParams.length+1;
                    text += " AND transitpublic<=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'foot-min':
                    paramIndex = qParams.length+1;
                    text += " AND transitfoot>=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'foot-max':
                    paramIndex = qParams.length+1;
                    text += " AND transitfoot<=$"+String(paramIndex);
                    qParams.push(req.body[q]);
                    break;
                case 'sort-by':
                    //continue
                    break;
                default:
                    res.send('invalid column key');
                    invalid=true;
                    break;
            }
        }
        if(req.body['sort-by']) {
            switch(req.body['sort-by']) {
                case 'newest':
                    text += " ORDER BY id DESC";
                    break;
                case 'rent-lh':
                    text += " ORDER BY rent ASC";
                    break;
                case 'rent-hl':
                    text += " ORDER BY rent DESC";
                    break;
                case 'sqft-lh':
                    text += " ORDER BY sqft ASC";
                    break;
                case 'sqft-hl':
                    text += " ORDER BY sqft DESC";
                    break;
                case 'cta-lh':
                    text += " ORDER BY transitpublic ASC";
                    break;
                case 'cta-hl':
                    text += " ORDER BY transitpublic DESC";
                    break;
                case 'foot-lh':
                    text += " ORDER BY transitfoot ASC";
                    break;
                case 'foot-hl':
                    text += " ORDER BY transitfoot DESC";
                    break;
                default:
                    console.log("invalid sort-by value");
                    break;
            }
        }
        if(qParams.length === 0 && !req.body['sort-by']) {
            text += " ORDER BY id DESC";
        }
        // console.log("Query:",text);
        // console.log("Params:",qParams);
        // console.log("****************************************");
        if(!invalid) {
            const client = await pool.connect();
            const result = await client.query(text, qParams);
            res.send(result ? result.rows : null);
        }
    } catch(err) {
        console.log(err);
        res.send('Error '+err);
    }
})

//receive new listings
app.post('/api/new', async (req, res) => {
    try {
        console.log("New listing received:",req.body);
        const client = await pool.connect();
        const result = await client.query('INSERT INTO Listings VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,DEFAULT,DEFAULT,$12)',
                                          [req.body.address,req.body.nickname || null,req.body.img || null,req.body.rent,req.body.sqft || 0,req.body.beds,req.body.baths,req.body.inunit === "on" ? "true" : "false",req.body.transitpublic || null,req.body.transitfoot || null,req.body.details || null,req.body.link]);
        res.redirect("https://zoommates.herokuapp.com/");
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

//add to post likes
app.post('/api/like', async (req, res) => {
    try {
        console.log("Like received for id",req.body.id);
        const client = await pool.connect();
        const result = await client.query('UPDATE Listings SET likes=likes+1 WHERE id=$1 AND likes<4;', [req.body.id]);
        // res.redirect("https://zoommates.herokuapp.com/");
        res.send("like successful");
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

//remove a post
app.post('/api/remove', async (req, res) => {
    try {
        console.log("Reqest to remove id",req.body.id);
        const client = await pool.connect();
        const result = await client.query("UPDATE Listings SET removed='t', removedreason=$1 WHERE id=$2", [req.body.removedreason, req.body.id]);
        res.redirect("https://zoommates.herokuapp.com/");
        // res.send("removal successful");
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

//log to console the active server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
