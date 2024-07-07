const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000 || process.env.PORT;

// Middleware to parse URL-encoded bodies
const corsOptions = {
  origin: 'https://qr-code-front-end-qyde.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));  // Enable CORS with specific options


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
