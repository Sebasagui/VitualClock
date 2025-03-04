let intervalClock = null;
let intervalStopwatch = null;
let timeZoneUsed = Intl.DateTimeFormat().resolvedOptions().timeZone;

function initClock() {
  if (intervalStopwatch) clearInterval(intervalStopwatch);
  intervalStopwatch = null;
  showAll();
  if (!intervalClock) intervalClock = setInterval(showClock, 1000);
  document.getElementById("clock").style.backgroundColor = "#A2D2FF";
  document.getElementById("stopwatch").style.backgroundColor = "#BDE0FE";
}

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: timeZoneUsed,
};

const timeOptions = {
  timeZone: timeZoneUsed,
};

function showClock() {
  let fecha = new Date();
  let clockHTML = `
    <div class = "reloj_contenedor" id="contenedor">
        <div id="hora">${fecha.toLocaleTimeString("en-US", timeOptions)}</div>
        <div id="fecha">${fecha.toLocaleDateString("en-US", dateOptions)}</div>
    </div>
        `;
  document.getElementById("mainclock").innerHTML = clockHTML;
}

function showAll() {
  showTimezone();
  showClock();
}

function showTimezone() {
  let currentZone = timeZoneUsed + " " + getUTC(timeZoneUsed);
  let timeZoneHTML =
    `
    <div class="selectbox">
        <label for="timeZone">Select the timezone:</label>
        <br>
        <div class="select">
            <select id="zoneSelect" onclick="updateTimezone()">
            <option value="${timeZoneUsed}" selected="selected">${currentZone}</option>` +
    getOptions() +
    `
            </select>
        </div>
    </div>`;
  document.getElementById("timeZone").innerHTML = timeZoneHTML;
}

function getUTC(tz) {
  const options = { timeZone: tz, timeZoneName: "longOffset" };
  const dateText = Intl.DateTimeFormat([], options)
    .format(new Date())
    .split(",")[1];
  return dateText;
}

function getOptions() {
  let timeZones = Intl.supportedValuesOf("timeZone");
  let textHTML = "";
  timeZones.forEach((timeZone) => {
    textHTML += `<option value=${timeZone}>${
      timeZone + getUTC(timeZone)
    }</option>`;
  });
  return textHTML;
}

function hideTimezone() {
  document.getElementById("timeZone").innerHTML = "";
}

function getDate(fecha) {
  const dias = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  let hour = fecha
    .toLocaleString("nl-NL", { timeZone: timeZoneUsed })
    .split(",")[1];
  let date = `${dias[fecha.getDay()]}. 
    ${fecha.getDate()}/${padStart(
    fecha.getMonth() + 1
  )}/${fecha.getFullYear()}`;
  return [hour, date];
}

function updateTimezone() {
  timeZoneUsed = document.getElementById("zoneSelect").value
  timeOptions.timeZone = timeZoneUsed;
  dateOptions.timeZone = timeZoneUsed;
}

//Stopwatch

let elapsed = 0;
const time = document.getElementById("time");

function initStopwatch() {
  if (intervalClock) clearInterval(intervalClock);
  intervalClock = null;
  if (!intervalStopwatch) {
    resetStopwatch();
    showStopwatch();
    hideTimezone();
  }
  document.getElementById("clock").style.backgroundColor = "#BDE0FE";
  document.getElementById("stopwatch").style.backgroundColor = "#A2D2FF";
}

function setTime() {
  let secondsElapsed = Math.floor(elapsed / 100);
  let minutesElapsed = Math.floor(secondsElapsed / 60);
  return `${padStart(minutesElapsed)}:${padStart(
    secondsElapsed % 60
  )}.${padStart(elapsed - secondsElapsed * 100)}`;
}

const timer = () => {
  elapsed++;
  updateStopwatch();
};

function startStopwatch() {
  if (intervalStopwatch) stopStopwatch();
  intervalStopwatch = setInterval(timer, 10);
}

function stopStopwatch() {
  clearInterval(intervalStopwatch);
  showStopwatch();
  updateStopwatch();
}

function resetStopwatch() {
  stopStopwatch();
  elapsed = 0;
  showStopwatch();
}

function showStopwatch() {
  let stopwatchHTML = `
    <div class="stopwatch">
        <div id="timerStopwatch">
            <h2>00:00.00</h2>
        </div>   
        <button id="startbut"onclick="startStopwatch()">START</button>
        <button id="stopbut" onclick="stopStopwatch()">STOP</button>
        <button id="resetbut" onclick="resetStopwatch()">RESET</button>
        <script src="index.js"></script>
    </div>
    `;
  document.getElementById("mainclock").innerHTML = stopwatchHTML;
}

function updateStopwatch() {
  let stopwatchHTML = ` 
    <h2>${setTime()}</h2>
    `;
  document.getElementById("timerStopwatch").innerHTML = stopwatchHTML;
}

function padStart(value) {
  return String(value).padStart(2, "0");
}
