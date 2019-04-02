require('dotenv').config();
const axios = require('axios');
const { parse } = require("url");

const AUTH = process.env.PERSONAL_SLACK;

if (!AUTH) {
    throw new Error('No AUTH token!');
}

const slack = axios.create({
    headers: { Authorization: `Bearer ${AUTH}` },
})

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    let text = "Pass in a value!";
    let response_type = "ephemeral";

    if (query.text) {
        const tokens = query.text.split(/[\s]+/g);
        console.log(query.text);
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

const respond = async (req, res) => {
    const { query } = parse(req.url, true);

    console.log('Received query', query);

    const input = query.text;
    const responseUrl = query.response_url;

    if (!responseUrl) {
        res.writeHead(400);
        res.end('Invalid request');
    } else if (!input) {
        return 'No emoji provided!';
    } else {
        try {
            const emojis = await getEmoji(input);

            const text = emojis.map((emoji) => `${emoji.emoji}: ${emoji.url}`).join("\n");

            if (emojis) {
                return {
                    response_type: 'ephemeral',
                    text
                };
            } else {
                return {
                    response_type: 'ephemeral',
                    text: `${input} not found. Perhaps it's a default emoji?`
                };
            }

        } catch (e) {
            console.warn('Error getting emoji', e);
        }
    }
};

const getEmoji = async query => {
    const { data: { emoji } } = await slack.get('https://slack.com/api/emoji.list');

    const parsed = query.replace(/:/g, '');
    const input = parsed.split(' ');

    const response = [];
    input.map((element) => {

        response.push({
            emoji: element,
            url: emoji[element]
        });
    });

    return response;
};

module.exports = respond;