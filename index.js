import { MARATHON_DISTANCE_KM, KMS_PER_MILE, SPLITS } from './constants.js';
import { durationToSeconds, secondsToDuration } from './time.js';

// ---- ELEMENTS ----
const form = document.querySelector("#pace-form");
const time = document.querySelector("#time");
const results = document.querySelector("#results");
const overallPace = document.querySelector("#overall-pace");

// ---- LOCAL STORAGE ----
if (localStorage.getItem("unit") != "km" && localStorage.getItem("unit") != "mi") {
    localStorage.setItem("unit", "km");
}
document.getElementById(localStorage.getItem("unit")).checked = true;

if (!localStorage.getItem("time")) {
    localStorage.setItem("time", "3:00:00");
}
time.value = localStorage.getItem("time");

// ---- EVENT LISTENERS ----
time.addEventListener("input", () => {
    localStorage.setItem("time", time.value);
    render();
});

document.querySelectorAll('input[name="unit"]').forEach((radio) => {
    radio.addEventListener("click", unitClicked);
});

function unitClicked(e) {
    localStorage.setItem("unit", document.querySelector('input[name="unit"]:checked').value);
    render();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("time", time.value);
    render();
});

// ---- RENDER ----
function render() {
    const secondsPerKm = durationToSeconds(localStorage.getItem("time")) / MARATHON_DISTANCE_KM;
    const unit = localStorage.getItem("unit");

    let HTML = '';
    SPLITS[unit].forEach((split) => {
        const totalSeconds = split.value * secondsPerKm;

        let distance = '';
        let duration = '';
        if (split.display == "Half" || split.display == "Finish") {
            distance = `<strong>${split.display}</strong>`;
            duration = `<strong>${secondsToDuration(totalSeconds)}</strong>`;
        } else {
            distance = split.display;
            duration = secondsToDuration(totalSeconds);
        }

        HTML += `<tr>
            <td>${distance}</td>
            <td>${duration}</td>
        </tr>`;
    });

    results.innerHTML = HTML;

    let secondsPerUnit = 0;
    if (unit == "mi") {
        secondsPerUnit = secondsPerKm * KMS_PER_MILE;
    } else if (unit == "km") {
        secondsPerUnit = secondsPerKm;
    }

    overallPace.innerHTML = `<strong>${secondsToDuration(secondsPerUnit, 1)}</strong> / ${unit}`;
}

render();
