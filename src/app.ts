import express from "express";
import expressRateLimit from "express-rate-limit";
import appConfig from "./2-utils/app-config";
import cors from "cors";
import helmet from "helmet";

import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import {initializeDbPool} from "./4-models/mysql_connection"

const server = express();

server.use(expressRateLimit({
    max: 70,
    windowMs: 1000,
    message: "Too many requests, please try again later."
}));

server.use(cors({ origin: appConfig.siteUrl } ));
server.use(helmet({
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// server.use('/api/', cardPricesController);


server.use('*', routeNotFound);

server.use(catchAll);

server.listen( appConfig.port, async () => {
    console.log(`Listening to http://localhost:${appConfig.port}`);
    await initializeDbPool();
})