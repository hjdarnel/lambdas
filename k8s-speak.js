const { parse } = require("url");

const alphanumerize = (tokens) => {
    return tokens.map((word) => word.replace(/[^0-9a-zA-Z\.\!\?:]/g, ""));
};

const k8ize = (tokens) => {
    return tokens.map((word) => {
        if (/:.+:/g.test(word)) {
            return word;
        }

        let punctuation = "";
        const replaced = word.replace(/[\!\?\.\,]/g, (match) => {
            punctuation = `${punctuation}${match}`;
            return ""
        });

        const length = replaced.length - 2;
        console.log(replaced);

        if (length > 1) {
            const first = replaced.slice(0, 1);
            const last = replaced.slice(-1);
            return `${first}${length}${last}${punctuation}`;
        } else {
            return `${replaced}${punctuation}`;
        }
    })
};

module.exports = (req, res) => {
    const { query, user_name} = parse(req.url, true);
    let text = "Pass in a value!";
    let response_type = "ephemeral";

    if (query.text) {
        const tokens = query.text.split(' ');

        const stripped = alphanumerize(tokens);
        const bareWords = k8ize(stripped);

        text = bareWords.join(' ');
        response_type = "in_channel";
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        response_type: response_type,
        text
    }));
};
