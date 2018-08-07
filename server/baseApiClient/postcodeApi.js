const readline = require('readline-sync');
const getRequest = require('./baseApiClient');

exports.getPostcodeCoords = function (postcode) {
    const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`;
    return getRequest
        .get(postcodeUrl)
        .then(postcodeJson => [postcodeJson["result"]["longitude"], postcodeJson["result"]["latitude"]]);
};
