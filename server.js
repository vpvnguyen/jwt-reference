const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/jwtAuth"));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
