
const elNow = document.querySelector('.now-time');
const elAlarm = document.querySelector('.alarm-time');

// ----------------------
// 這是在 main.js require moment.js 時使用的
// window.api.receive("fromMoment-fulltime", (args) => {
//     console.log(args[0]);
// });
// window.api.send("toMoment-fulltime");
// ----------------------

// 以下是在 preload.js require moment.js 時用的

elAlarm.addEventListener('change', onAlarmTextChange);

let nowTime;
let alarmTime;

const now = window.moment.time();
nowTime = now;
elNow.innerHTML = now;

const alarm = window.moment.add(5);
alarmTime = alarm;
if (elAlarm instanceof HTMLInputElement) {
    elAlarm.value = alarm;
}

timer();

function timer() {
    time = window.moment.time();

    nowTime = time;
    elNow.innerHTML = time;

    setTimeout(() => {
        timer();
    }, 1000);
}

function onAlarmTextChange(event) {
    
}