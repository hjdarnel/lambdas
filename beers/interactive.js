require('dotenv').config();
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const UPTOWN_API_KEY = process.env.UPTOWN_API_KEY;
const DOWNTOWN_API_KEY = process.env.DOWNTOWN_API_KEY;

const { parse } = require("querystring");
const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.apify.com/v1/3mCu57Cd75TfADp2i/crawlers/',
    timeout: 10000
});

const slack = axios.create({
    baseURL: 'https://slack.com/api/',
    headers: {'Authorization': `Bearer ${SLACK_TOKEN}`},
    timeout: 10000
});

const getBeers = async (location) => {
    let response;
    switch (location) {
        case 'uptown':
            response = await api.get('aejTridmg43ucDwhb/lastExec/results', { params: { token: UPTOWN_API_KEY }});
            return response.data[0];
        case 'downtown':
            response = await api.get('YSPkQayere2C9snsY/lastExec/results', { params: { token: DOWNTOWN_API_KEY }});
            return response.data[0];
        default:
            break;
    }
}

const formatBeers = async (beerData, prettyLocation, location, amount) => {
    const taps = beerData.pageFunctionResult.taps;
    const cans = beerData.pageFunctionResult.cans;
    const length = taps.length + cans.length;
    const tapsFormatted = [];
    const cansFormatted = [];
    const date = new Date(beerData.pageFunctionFinishedAt).toLocaleDateString("en-US", { hour: "2-digit", minute: "2-digit"});

    const blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `It's a nice day for a drink!
🍻 We found *${length} beers* at *<${beerData.pageFunctionResult.location}|${prettyLocation}>*`
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*${taps.length} beers* on tap`
            },
        }
    ];

    taps.slice(0, amount).map(beer => {
        const section = [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*<${beer.link}|${beer.name}>* • ${beer.type}
by *<${beer.brewery.link}|${beer.brewery.name}>*
${"★".repeat(Math.floor(beer.rating))} ${beer.stats.abv} ${beer.stats.ibu}`
                },
                "accessory": {
                    "type": "image",
                    "image_url": `${beer.image}`,
                    "alt_text": `${beer.name} thumbnail`
                }
            }
        ];

        tapsFormatted.push(...section);
    });

    cans.slice(0, amount).map(beer => {
        const section = [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*<${beer.link}|${beer.name}>* • ${beer.type}
by *<${beer.brewery.link}|${beer.brewery.name}>*
${"★".repeat(Math.floor(beer.rating))} ${beer.stats.abv} ${beer.stats.ibu}`
                },
                "accessory": {
                    "type": "image",
                    "image_url": `${beer.image}`,
                    "alt_text": `${beer.name} thumbnail`
                }
            }
        ];

        cansFormatted.push(...section);
    });

    blocks.push(...tapsFormatted);

    blocks.push(
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*${cans.length} beers* in can/bottle`
            },
        }
    );

    blocks.push(...cansFormatted);

    blocks.push(
        {
            "type": "divider"
        },
        {
            "type": "actions",
            "block_id": "more_beer",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": `See full beer list (${length} beers)`
                    },
                    "value": "more" + "_" + prettyLocation + "_" + location
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "Share to channel"
                    },
                    "value": "share" + "_" + prettyLocation + "_" + location
                }
            ]
        },
        {
        "type": "context",
        "elements": [
            {
                "type": "plain_text",
                "text": `Last updated: ${date}`,
                "emoji": true
            }
        ]
    },
    );

    return blocks;
};


const updateMessage = async ({beerData, response_url, prettyLocation, location, amount = 4, response_type = "ephemeral"}) => {
    const params = {
        blocks: await formatBeers(beerData, prettyLocation, location, amount),
        replace_original: true,
        delete_original: response_type === "in_channel" ? true : false,
        response_type
    }

    return slack.post(response_url, params);
};


module.exports = async (req, res) => {
    if (req.method === 'POST') {
        let formBody = '';

        req.on('data', chunk => {
            formBody += chunk.toString();
        });

        req.on('end', async () => {
            const body = parse(formBody);
            const payload = JSON.parse(body.payload);

            res.writeHead(200);
            res.end("");

            if (payload.actions[0].block_id === "select_location") {
                const beerData = await getBeers(payload.actions[0].selected_option.value);
                console.log(payload.actions[0].selected_option);
                await updateMessage({beerData, response_url: payload.response_url, prettyLocation: payload.actions[0].selected_option.text.text, location: payload.actions[0].selected_option.value});
            }
            if (payload.actions[0].block_id === "more_beer") {
                const params = payload.actions[0].value.split("_");
                const [action, prettyLocation, location] = params;

                if (action === "share") {
                    const beerData = await getBeers(location);
                    await updateMessage({beerData, response_url: payload.response_url, prettyLocation, location, response_type: "in_channel"});
                } else {
                    const beerData = await getBeers(location);
                    await updateMessage({beerData, response_url: payload.response_url, prettyLocation, location, amount: 999});
                }
            }

        });
    } else {
        res.writeHead(200);
        res.end("");
    }
};
