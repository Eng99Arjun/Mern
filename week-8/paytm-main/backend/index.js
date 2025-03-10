const express = require("express");
const rootRouter = require("./routes/index");

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  };

const cors = require("cors");

const app = express();

 app.use(cors());
app.use(express.json());


app.use('/api/v1', rootRouter);

app.listen(3000);