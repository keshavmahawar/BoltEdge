const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./routes/mainRoute");
const adminRoute = require("./routes/adminRoute");
const restaurantRoute = require("./routes/restaurantRoute");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/user", authRoute);
app.use("/restaurant", restaurantRoute);
app.use("/admin", adminRoute);

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (error) => {
        if (error) console.log(`error connecting database : ${error}`);
        else console.log("Database connected");
    }
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
