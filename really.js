const parse = require('urlencoded-body-parser');
const axios = require('axios');

const getText = (who, what) => {
    return `
${who}
really
    really
    really
        really
        really
        really
        really
    really
    really
really
really
really
    really
    really
    really
        really
        really
        really
        really
    really
    really
really
really
really
    really
    really
    really
        really
        really
        really
        really
    really
    really
really ${what.join(' ')}`;
};

module.exports = async (req, res) => {
    const { text, response_url } = await parse(req);
    const [ who, ...what] = text.split(' ');

    await axios.post(response_url, {
            response_type: "in_channel",
            text: getText(who, what)
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
};
