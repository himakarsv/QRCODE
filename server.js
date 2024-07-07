const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000 || process.env.PORT;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// Route to generate QR code
app.post('/generate', (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  // Generate QR code image as a base64 string
  const qr_svg = qr.imageSync(url, { type: 'png' });
  const base64QR = Buffer.from(qr_svg).toString('base64');
  res.send({ qrCode: base64QR });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
