var axios = require('axios');

var id = "cc78fb913f5d55dc67a375382fe3253b89173e2fe02ccf1b1cd1997e843cb335";
var params = "?client_id=" + id;

module.exports = {
    photo: function() { // TODO: change for production
        return axios.get('../../resources/test.json') // ('https://api.unsplash.com/photos/random/' + params)
            .then(function(photo) {
                return photo.data;
            });
    }
}