const axios = require('axios');

async function updateTweet(tweetId, newLikes, newRetweets) {
    const apiUrl = `https://api.twitter.com/1.1/statuses/update.json`;

    const params = {
        id: tweetId,
        likes: newLikes,
        retweets: newRetweets
    };

    const headers = {
        Authorization: 'Ruben'
    };

    try {

        const response = await axios.post(apiUrl, params, { headers });
        return ('Tweet mis à jour avec succès:', response.data);
    } catch (error) {
        return ('Erreur lors de la mise à jour du tweet:', error.response.data);
    }
}
updateTweet('ID_DU_TWEET', NOUVEAU_NOMBRE_DE_LIKES, NOUVEAU_NOMBRE_DE_RETWEETS);