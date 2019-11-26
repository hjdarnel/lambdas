const parse = require('urlencoded-body-parser');
const axios = require('axios');

const getText = () => {
    const cats = ['🐈', '🐱', '😼', '🙀', '😾', '😿', '😻', '😺', '😹', '😸', '😽', '🐆', '🐅'];
    return `meow ${cats.join(' ')} meow`;
};

module.exports = async (req, res) => {
    const { response_url } = await parse(req);
    await axios.post(response_url, {
            response_type: "in_channel",
            text: getText()
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
};
