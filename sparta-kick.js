const parse = require('urlencoded-body-parser');
const axios = require('axios');

const getText = ({kicker, kicked}) => {
    return `${kicker}
O
く|)へ
    〉                 ${kicked}
￣￣┗┓
　 　   ┗┓　     ヾ○ｼ
　　        ┗┓   ヘ/ 　 　
　                 ┗┓ノ
　 　 　 　 　    ┗┓`;
}

module.exports = async (req, res) => {
    const {text, response_url} = await parse(req);
    const [ kicker, ...kicked] = text.split(',').map(i => i.trim());

    await axios.post(response_url, {
            response_type: "in_channel",
            text: getText({kicker, kicked})
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
};
