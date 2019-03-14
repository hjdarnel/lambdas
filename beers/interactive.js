const axios = require('axios');
const parse = require('urlencoded-body-parser');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const body = await parse(req);

        if (!body.payload) {
            res.writeHead(400);
            res.end("No body");
            return;
        } else {
            const payload = JSON.parse(body.payload);

            if (!payload) {
                console.log("no payload");
                res.writeHead(500);
                res.end("No payload");
            }

            axios.post("https://lambda.darnell.io/beers/formatBeers.js", payload);

            res.writeHead(200);
            res.end();
        }
    } else {
        res.writeHead(400);
        res.end("Unsupported method: POST only");
    }
};
