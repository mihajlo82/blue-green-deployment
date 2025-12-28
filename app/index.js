const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('HEYY Hello from Express AGAIn!');
});

app.get('/green', (req, res) => {
  res.send('GReen route 321');
});

app.get('/test', (req, res) => {
  res.send('TEst route 321');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
