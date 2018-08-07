const express = require("express");
const busDepartures = require("./busDepartures");

const app = express();
app.use(express.static('../frontend'));
app.use('/longBusJourney', express.static('frontend/longBusJourney.html'));
app.get(`/currentDepartures/postcode/:postcode`, (req, res) => {
    busDepartures
        .getNextFiveBusArrivals(req.params.postcode)
        .then((jsonBusArrivals) => res.status(200).send(jsonBusArrivals))
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
});
app.listen(3000, () => console.log(`App listening on port 3000.`));
