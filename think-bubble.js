const parse = require('urlencoded-body-parser');
const axios = require('axios');

const getText = (who, what, rest) => {
    return `
:blank::thought-balloon-top-left::thought-balloon-top-middle::thought-balloon-top-right:
:blank::thought-balloon-center-left:${what}:thought-balloon-center-right:
:blank::thought-balloon-bottom-left::thought-balloon-bottom-middle::thought-balloon-bottom-right:
${who}${rest.join(' ')}`;
};

module.exports = async (req, res) => {
    const { text, response_url } = await parse(req);
    const [ who, what = ":blank:", ...rest] = text.split(' ');

    await axios.post(response_url, {
            response_type: "in_channel",
            text: getText(who, what, rest)
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
};
