exports.sortAndExtractBusArrivals = function (rawData) {
    rawData.sort((a, b) => a['timeToStation'] > b['timeToStation']);
    return rawData.slice(0, 5);
};

exports.extractBusArrivals = function (buses) {
    return JSON.stringify([extractBusArrivalsForStop(buses[0]), extractBusArrivalsForStop(buses[1])])
};

function extractBusArrivalsForStop(buses) {
    buses = buses.map(bus => ({
        stationName: bus.stationName,
        lineId: bus.lineId,
        destinationName: bus.destinationName,
        timeToStation: `${Math.floor((bus.timeToStation) / 60)} minutes ${bus.timeToStation % 60} seconds`
    }));
    return buses
}