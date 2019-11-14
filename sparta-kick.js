const parse = require('urlencoded-body-parser');

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
    const { text } = await parse(req);

    const [ kicker, ...kicked] = text.split(',').map(i => i.trim());
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        response_type: "in_channel",
        text: getText({kicker, kicked})
    }));
};
