var axios = require('axios');

// API call parameters
var APPLICATION_ID = "cc78fb913f5d55dc67a375382fe3253b89173e2fe02ccf1b1cd1997e843cb335";
var MAX_PHOTOS = 30;

var params = "?client_id=" + APPLICATION_ID + "&count=" + MAX_PHOTOS;

module.exports = {
    photos: function() { // TODO: change for production
        return axios.get('../../resources/test.json')
        //return axios.get('https://api.unsplash.com/photos/random/' + params)
            .then(function(photos) {
                return photos.data;
            });
    }
}