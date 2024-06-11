// index.js (ES Module)

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/books', express.static(path.join(__dirname, '..', 'books')));

app.get('/books/:bookName', (req, res) => {
  const { bookName } = req.params;
  res.sendFile(path.join(__dirname, '..', 'books', `${bookName}.html`));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
