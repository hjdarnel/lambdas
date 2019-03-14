const { parse } = require('querystring');

const response = [
    {
        type: 'section',
        block_id: 'select_location',
        text: {
            type: 'mrkdwn',
            text: 'Pick a location from the dropdown list'
        },
        accessory: {
            action_id: 'section734454127',
            type: 'static_select',
            placeholder: {
                type: 'plain_text',
                text: 'Select a taproom',
                emoji: true
            },
            options: [
                {
                    text: {
                        type: 'plain_text',
                        text: 'Puritan Uptown',
                        emoji: true
                    },
                    value: 'uptown'
                },
                {
                    text: {
                        type: 'plain_text',
                        text: 'Puritan Downtown',
                        emoji: true
                    },
                    value: 'downtown'
                }
            ]
        }
    }
];

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        let formBody = '';

        req.on('data', chunk => {
            formBody += chunk.toString();
        });

        req.on('end', () => {
            body = parse(formBody);

            res.writeHead(200, { 'Content-Type': 'application/json' });

            res.end(
                JSON.stringify({
                    response_type: 'ephemeral',
                    blocks: response
                })
            );
        });
    }
};
