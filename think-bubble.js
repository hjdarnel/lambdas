const { parse } = require("url");

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    const { text = "Use query 'text'" } = query;
    const [ who, what, ...rest] = text.split(' ');
    if (rest.length > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            response_type: "ephemeral",
            text: `Only pass 2 options: who and what`
        }));
    } else {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            response_type: "in_channel",
            text: `
:blank::thought-balloon-top-left::thought-balloon-top-middle::thought-balloon-top-right:
:blank::thought-balloon-center-left:${what}:thought-balloon-center-right:
:blank::thought-balloon-bottom-left::thought-balloon-bottom-middle::thought-balloon-bottom-right:
${who}
            `
        }));
    }
};
