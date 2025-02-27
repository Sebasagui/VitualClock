
/*const mostrarReloj = () => {
    let fecha = new Date();
    let hr = padStart(fecha.getHours());
    let min = padStart(fecha.getMinutes());
    let seg = padStart(fecha.getSeconds());
    document.getElementById('hora').innerHTML = `${hr}:${min}:${seg}`;
    const dias = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
    document.getElementById('fecha').innerHTML = 
    `${dias[fecha.getDay()]}. ${fecha.getDate()}/${padStart(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
}*/

function padStart(value) {
    return String(value).padStart(2,"0");
}

let intervalClock = null
let intervalStopwatch = null;

function initClock(){
    if(intervalStopwatch) clearInterval(intervalStopwatch)
    intervalStopwatch = null;
    showClock();

    if(!intervalClock) intervalClock = setInterval(showClock, 1000);
}

function showClock(){
    let fecha = new Date();
    let clockHTML = `
    <div class = "reloj_contenedor" id="contenedor">
            <div id="hora">${getTime(fecha)}</div>
            <div id="fecha">${getDate(fecha)}</div>
        </div>
        `;
    document.getElementById('mainclock').innerHTML = clockHTML;
}

function getTime(fecha){
    let hr = padStart(fecha.getHours());
    let min = padStart(fecha.getMinutes());
    let seg = padStart(fecha.getSeconds());
    return `${hr}:${min}:${seg}`;
}

function getDate(fecha){
    const dias = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
    return `${dias[fecha.getDay()]}. 
    ${fecha.getDate()}/${padStart(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
}



//Stopwatch

let elapsed = 0;
const time = document.getElementById("time")

function initStopwatch(){
    if(intervalClock) clearInterval(intervalClock)
    intervalClock = null;
    if(!intervalStopwatch){
        resetStopwatch();
        showStopwatch();
    }
    
}

function setTime() {
    let secondsElapsed = Math.floor((elapsed/100));
    let minutesElapsed = Math.floor(secondsElapsed / 60);
    return `${padStart(minutesElapsed)}:${padStart(secondsElapsed % 60)}.${padStart(elapsed-secondsElapsed*100)}`;
}

const timer = () => {
    elapsed++;
    updateStopwatch();
}

function startStopwatch() {
    if (intervalStopwatch) stopStopwatch()
    intervalStopwatch = setInterval(timer, 10)
}

function stopStopwatch() {
    clearInterval(intervalStopwatch);
    showStopwatch();
    updateStopwatch();
}

function resetStopwatch() {
    stopStopwatch()
    elapsed = 0;
    showStopwatch();
}

function showStopwatch(){
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
    document.getElementById('mainclock').innerHTML = stopwatchHTML
}

function updateStopwatch(){
    let stopwatchHTML = ` 
    <h2>${setTime()}</h2>
    `
    document.getElementById('timerStopwatch').innerHTML = stopwatchHTML
}