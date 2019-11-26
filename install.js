module.exports = async (req, res) => {
    const slackUrl = `https://slack.com/oauth/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=commands`;
    // Send redirect response to slack domain
    res.writeHead(302, 'Redirect', { Location: slackUrl });
    res.end();
}