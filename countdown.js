
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

let fullTime = window.moment.fullTime();

let nowTime;
let alarmTime;

const now = window.moment.time(fullTime);
nowTime = now;
elNow.innerHTML = now;

const alarm = window.moment.add(5, fullTime);
alarmTime = alarm;
if (elAlarm instanceof HTMLInputElement) {
    elAlarm.value = alarm;
}

timer();

function timer() {
    time = window.moment.time();

    nowTime = time;
    elNow.innerHTML = time;

    check();

    setTimeout(() => {
        timer();
    }, 1000);
}

function check() {
    const diff = window.moment.diff(nowTime, alarmTime);
    if (diff === 0) {
        const msg = "It's " + alarmTime + ". Wake Up!";
        window.notifier.notice(msg);
    }
}

function onAlarmTextChange(event) {
    alarmTime = event.target.value;
}