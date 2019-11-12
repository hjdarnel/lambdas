const getCats = () => {
    const cats = ['🐈', '🐱', '😼', '🙀', '😾', '😿', '😻', '😺', '😹', '😸', '😽', '🐆', '🐅'];
    return cats;
};

module.exports = async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        response_type: "in_channel",
        text: `meow ${getCats().join(' ')} meow`
    }));
};