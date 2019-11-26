const parse = require('urlencoded-body-parser');
const axios = require('axios');

const alphanumerize = (tokens) => {
    return tokens.map((word) => word.replace(/[^0-9a-zA-Z\-_\.,\!\?:]/g, ""));
};

const k8ize = (tokens) => {
    return tokens.map((word) => {
        if (/:.+:/g.test(word)) {
            return word;
        }

        let punctuation = "";
        const replaced = word.replace(/[\!\?\.,:]/g, (match) => {
            punctuation = `${punctuation}${match}`;
            return ""
        });

        const length = replaced.length - 2;

        if (length > 0) {
            const first = replaced.slice(0, 1);
            const last = replaced.slice(-1);
            return `${first}${length}${last}${punctuation}`;
        } else {
            return `${replaced}${punctuation}`;
        }
    })
};

module.exports = async (req, res) => {
    const query = await parse(req);
    let text = "Pass in a string!";
    let response_type = "ephemeral";

    if (query.text) {
        const tokens = query.text.split(/[\s]+/g);
        console.log(text);
        const stripped = alphanumerize(tokens);
        const bareWords = k8ize(stripped);

        text = bareWords.join(' ');
        response_type = "in_channel";
    }

    await axios.post(query.response_url, {
        response_type,
        text: text
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
};
