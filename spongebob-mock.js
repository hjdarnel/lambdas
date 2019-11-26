const parse = require('urlencoded-body-parser');
const axios = require('axios');

const alternateCase = function (s) {
    let chars = s.toLowerCase().split("");
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toUpperCase();
    }
    return chars.join("");
};

module.exports = async (req, res) => {
    const { text, response_url } = await parse(req);

    await axios.post(response_url, {
            response_type: "in_channel",
            text: `:spongebob-mock: ${alternateCase(text)} :spongebob-mock:`
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
};
