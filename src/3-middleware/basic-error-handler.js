import { error } from "console";

function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({error: "The server have a problam!"} )
}

export {errorHandler}