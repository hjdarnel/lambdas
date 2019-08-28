const parse = require('urlencoded-body-parser');

const alternateCase = function (s) {
    let chars = s.toLowerCase().split("");
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toUpperCase();
    }
    return chars.join("");
};

module.exports = async (req, res) => {
    const { text } = await parse(req);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        response_type: "in_channel",
        text: `:spongebob-mock: ${alternateCase(text)} :spongebob-mock:`
    }));
};