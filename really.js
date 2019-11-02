const parse = require('urlencoded-body-parser');

module.exports = async (req, res) => {
    const { text } = await parse(req);

    const [ who, ...what] = text.split(' ');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        response_type: "in_channel",
        text: `
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
really ${what.join(' ')}`
    }));
};
