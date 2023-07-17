const mongoose = require("mongoose");
const URI = process.env.URI;


mongoose
  .connect(URI)
  .then(() => {
    console.log(`db is connected`);
  })
  .catch(() => {
    `db is not connected`;
  });
