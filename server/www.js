require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// Postgres Configuration
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected Error:', err);
  process.exit(-1);
});

const rootUrl = '/api';

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get(`${rootUrl}/user`, (req, res) => {
  ; (async () => {
    const { rows } = await pool.query('SELECT * FROM "user"')
    res.json(rows);
  })().catch(err => {
    res.json(err.stack)
  })
});

app.get(`${rootUrl}/todo_item`, (req, res) => {
  ; (async () => {
    const { rows } = await pool.query('SELECT * FROM "todo"')
    res.json(rows);
  })().catch(err => {
    res.json(err.stack)
  })
});

app.post(`${rootUrl}/user/reg`, (req, res) => {
  const {
    user_id,
    username,
    password,
    number_translate
  } = JSON.parse(req.body.user);

  ; (async () => {
    const client = await pool.connect();
    try {
      let results = await client.query(
        `INSERT INTO public.user (
          user_id, 
          username, 
          password,  
          number_translate
      ) VALUES ($1, $2, $3, $4) 
      ON CONFLICT DO NOTHING`,
        [user_id, username, password, number_translate]);
      if (results.rowCount === 0) {
        results = {
          user_id, username, password, number_translate
        };
      }
      res.status(201).json(results);
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release();
    }
  })().catch(err => {
    res.status(500).json({
      "code": err.code,
      "message": err.message
    });
  });
});


app.post(`${rootUrl}/todo_item`, (req, res) => {
  const
    { id,
      user_name,
      content,
      completed,
      editing } = JSON.parse(req.body.todo);

  ; (async () => {
    const client = await pool.connect();
    try {
      let results = await client.query(
        `INSERT INTO public.todo (
          id,
          user_name, 
          content, 
          completed,  
          editing
      ) VALUES ($1, $2, $3, $4,$5) 
      ON CONFLICT DO NOTHING
      RETURNING id,user_name,content,completed,editing`,
        [id, user_name, content, completed, editing]);
      if (results.rowCount === 0) {
        results = {
          id, user_name, content, completed, editing
        };
      }
      res.status(201).json(results);
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release();
    }
  })().catch(err => {
    res.status(500).json({
      "code": err.code,
      "message": err.message
    });
  });
});

app.post(`${rootUrl}/todo_item/del`, (req, res) => {
  const
    { id } = JSON.parse(req.body.todo);
  ; (async () => {
    const { rows } = await pool.query('DELETE FROM "todo" WHERE id = $1', [id])
    res.json(rows);
  })().catch(err => {
    res.json(err.stack)
  })
});

app.post(`${rootUrl}/todo_item/complete`, (req, res) => {
  const
    { id, completed } = JSON.parse(req.body.todo);

  ; (async () => {
    const { rows } = await pool.query('UPDATE "todo" SET completed = $2 WHERE id = $1', [id,completed])
    res.json(rows);
  })().catch(err => {
    res.json(err.stack)
  })
});

app.post(`${rootUrl}/todo_item/content`, (req, res) => {
  const
    { id, content } = JSON.parse(req.body.todo);

  ; (async () => {
    const { rows } = await pool.query('UPDATE "todo" SET content = $2 WHERE id = $1', [id, content])
    res.json(rows);
  })().catch(err => {
    res.json(err.stack)
  })
});

app.get('/api/status', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/status', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/status', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Listen to the specified port, otherwise 3080
const PORT = process.env.PORT || 3080;
const server = app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
});
/**
 * The SIGTERM signal is a generic signal used to cause program 
 * termination. Unlike SIGKILL , this signal can be blocked, 
 * handled, and ignored. It is the normal way to politely ask a 
 * program to terminate. The shell command kill generates 
 * SIGTERM by default.
 */
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server Close: Process Terminated!');
  });
});
