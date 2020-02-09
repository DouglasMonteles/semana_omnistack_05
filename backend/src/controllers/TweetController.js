const Tweet = require('../models/Tweet');

module.exports = {
    async index(req, res) { // lista os tweets
        const tweets = await Tweet.find({}).sort('-createdAt'); // .sort('createdAt') retorna todos os registros do ultimo p/ primeiro, com '-' na frente a ordem inverte 
        
        return res.json(tweets);
    },

    async store(req, res) { // cadastra os tweets
        const tweet = await Tweet.create(req.body);

        return res.json(tweet);
    }
}