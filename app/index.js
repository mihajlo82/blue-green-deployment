const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express 12!');
});

app.get('/green', (req, res) => {
  res.send('GReen route');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
