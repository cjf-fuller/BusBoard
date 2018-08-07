const postcodeApi = require('./baseApiClient/postcodeApi');
const tflApi = require('./baseApiClient/tflApi');
const displayBuses = require('./baseApiClient/sortAndExtractBuses');

exports.getNextFiveBusArrivals = function(postcode) {
    return postcodeApi
        .getPostcodeCoords(postcode)
        .then((coords) => tflApi.getNearestTwoBusStop(coords))
        .then(function (nearestBusStop) {
            const sortedTwoBus = nearestBusStop.map(busStopCode => tflApi.getBusArrivals(busStopCode));
            return Promise.all(sortedTwoBus);
        })
        .then((sortedBusArrivals) => displayBuses.extractBusArrivals(sortedBusArrivals))
        .catch((err) => console.log(err));
};


