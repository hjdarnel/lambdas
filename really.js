const { parse } = require("url");

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    const { text = "Use query 'text'" } = query;
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
