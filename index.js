//  <string>      ->    <number>
//  'HH:MM:SS'    ->    seconds
function durationStringToSeconds(hms) {
    const a = hms.split(':');

    if (a.length == 1) {
        // just have hour
        return (+a[0]) * 60 * 60
    }

    if (a.length == 2) {
        // just have minutes and hours
        return (+a[0]) * 60 * 60 + (+a[1]) * 60
    }

    // minutes are worth 60 seconds
    // hours are worth 60 minutes
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}

function fancyTimeFormat(duration, decimals = 0) {
    // Hours, minutes and seconds
    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = (duration % 60).toFixed(decimals);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}

const form = document.querySelector("#pace-form");
const time = document.querySelector("#time");
const results = document.querySelector("#results");
const overallPace = document.querySelector("#overall-pace");

const MARATHON_DISTANCE_KM = 42.195;


if (localStorage.getItem("unit") != "km" && localStorage.getItem("unit") != "mi") {
    localStorage.setItem("unit", "km");
}
document.getElementById(localStorage.getItem("unit")).checked = true;

if (!localStorage.getItem("time")) {
    localStorage.setItem("time", "3:00:00");
}
time.value = localStorage.getItem("time");

document.querySelectorAll('input[name="unit"]').forEach((radio) => {
    radio.addEventListener("click", unitClicked);
});

function unitClicked(e) {
    localStorage.setItem("unit", document.querySelector('input[name="unit"]:checked').value);
    renderResults();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("time", time.value);
    renderResults();
});

KMS_PER_MILE = 1.609344;

SPLITS = {
    "km": [
        { "display": "5 km", "value": 5 },
        { "display": "10 km", "value": 10 },
        { "display": "15 km", "value": 15 },
        { "display": "20 km", "value": 20 },
        { "display": "Half", "value": MARATHON_DISTANCE_KM / 2 },
        { "display": "25 km", "value": 25 },
        { "display": "30 km", "value": 30 },
        { "display": "35 km", "value": 35 },
        { "display": "40 km", "value": 40 },
        { "display": "Finish", "value": MARATHON_DISTANCE_KM },
    ],
    "mi": [
        { "display": "5 mi", "value": 5 * KMS_PER_MILE },
        { "display": "10 mi", "value": 10 * KMS_PER_MILE },
        { "display": "Half", "value": MARATHON_DISTANCE_KM / 2 },
        { "display": "15 mi", "value": 15 * KMS_PER_MILE },
        { "display": "20 mi", "value": 20 * KMS_PER_MILE },
        { "display": "25 mi", "value": 25 * KMS_PER_MILE },
        { "display": "Finish", "value": MARATHON_DISTANCE_KM },
    ],
};

function renderResults() {
    const secondsPerKm = durationStringToSeconds(time.value) / MARATHON_DISTANCE_KM;
    const unit = localStorage.getItem("unit");

    let HTML = '';
    SPLITS[unit].forEach((split) => {
        totalSeconds = split.value * secondsPerKm;

        display = '';
        duration = '';
        if (split.display == "Half" || split.display == "Finish") {
            display = `<strong>${split.display}</strong>`;
            duration = `<strong>${fancyTimeFormat(totalSeconds)}</strong>`;
        } else {
            display = split.display;
            duration = fancyTimeFormat(totalSeconds);
        }

        distance =
            HTML += `<tr>
            <td>${display}</td>
            <td>${duration}</td>
        </tr>`;
    });

    results.innerHTML = HTML;

    if (unit == "mi") {
        secondsPerUnit = secondsPerKm * KMS_PER_MILE;
    } else if (unit == "km") {
        secondsPerUnit = secondsPerKm;
    }

    overallPace.innerHTML = `<strong>${fancyTimeFormat(secondsPerUnit, 1)}</strong> / ${localStorage.getItem("unit")}`;
}

renderResults();
