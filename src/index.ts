import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(cors({
    // origin: "http://example.com",  // for specific origin 
    credentials: true, // allow security cors-origins
}));

app.use(compression()); // use for reduce size of compressed response (compress types: gzip, dflat), benefit for slow connections
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("server up & run on port 8080");
})

const MONGO_URL = 'mongodb://thiwanka:Thiwanka@25#@cluster0.zxp3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/',router());