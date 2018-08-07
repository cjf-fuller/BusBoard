function updateBusBoardPageWithSuccess(busArrivalResponse, postcode) {
    updateDeparturesInfoSentence("departuresInfoDisplay", postcode);
    updatebusStopStationName("busStopOneStationName", busArrivalResponse[0][0]);
    updatebusStopStationName("busStopTwoStationName", busArrivalResponse[1][0]);
    updateBusStopArrivals("busArrivalsAtStopOne", busArrivalResponse[0]);
    updateBusStopArrivals("busArrivalsAtStopTwo", busArrivalResponse[1]);
}

function updateBusStopArrivals(elementId, arrivals) {
    let busList = document.createElement("UL");
    for (let bus of arrivals) {
        let busNode = document.createElement("LI");
        let textnode = document.createTextNode(`${bus["timeToStation"]}: ${bus["lineId"].toUpperCase()} to ${bus["destinationName"]}`);
        busNode.appendChild(textnode);
        busList.appendChild(busNode);
    }
    document.getElementById(elementId).innerHTML = "";
    document.getElementById(elementId).appendChild(busList);
}

function updateDeparturesInfoSentence(elementId, postcode) {
    document.getElementById("departuresInfoDisplay").innerHTML = `Next departures from the nearest two bus stops to ${postcode}`;
}

function updatebusStopStationName (elementId, busArrivalResponse) {
    document.getElementById(elementId).innerHTML = busArrivalResponse["stationName"];
}

function updateBusBoardPageWithError() {
    hideShowElement("departures");
    hideShowElement("httpRequestError");
}

function hideShowElement(element) {
    if(element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function getDepartures() {
    let xhttp = new XMLHttpRequest();
    let postcode = document.getElementById("formPostcode").value.toUpperCase().replace(" ", "");
    xhttp.open('GET', `http://localhost:3000/currentDepartures/postcode/${postcode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                const busArrivalResponse = JSON.parse(xhttp.response);
                updateBusBoardPageWithSuccess(busArrivalResponse, postcode);
            } else {
                console.log(new Error(`Status code was ${xhttp.status}`));
                updateBusBoardPageWithError();
            }
        }
    };
    xhttp.send(null);
}

function autoUpdateDepartures() {
    getDepartures();
    setInterval(function(){getDepartures();}, 30000);
}



