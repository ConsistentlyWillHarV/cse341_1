const express = require('express');
const app = express();

const port = process.env.PORT || 3001;


app.use('/', require('./routes')); //if it get traffic it will go to routes


// Add a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
