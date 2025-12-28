const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('HEYY test 44 Hello from Express AGAIn!');
});

app.get('/green', (req, res) => {
  res.send('GReen gree route 321');
});

app.get('/test', (req, res) => {
  res.send('TEst test test route 3214');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
