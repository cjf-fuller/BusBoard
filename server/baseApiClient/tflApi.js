const sortBuses = require('./sortAndExtractBuses');
const getRequest = require('./baseApiClient');

const API_QUERY_STRING_TFL = 'app_id=66354b18&app_key=e9af9af78d300a4ee2674b1cef0333cc';

exports.getNearestTwoBusStop = function (coords) {
    const findBusStopsUrl = `https://api.tfl.gov.uk/Place?type=NaptanOnstreetBusCoachStopCluster%2C%20NaptanBusWayPoint%2C%20NaptanPublicBusCoachTram%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanBusCoachStation&lat=${coords[1]}&lon=${coords[0]}&radius=200&${API_QUERY_STRING_TFL}`;
    return getRequest
        .get(findBusStopsUrl)
        .then(nearestBusStopsJson => [nearestBusStopsJson["places"][0]["id"], nearestBusStopsJson["places"][1]["id"]]);

};

exports.getBusArrivals = function (stopCode) {
    const busArrivalUrlOne = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?${API_QUERY_STRING_TFL}`;
    return getRequest
        .get(busArrivalUrlOne)
        .then(busArrivalsJson => sortBuses.sortAndExtractBusArrivals(busArrivalsJson));
};
