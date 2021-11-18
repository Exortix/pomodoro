const pomodoro = {
    started: false,
    time: 0,
    interval: null,
    elements: {
        time: null,
        startWork: null,
        startShortBreak: null,
        startLongBreak: null,
        stop: null
    },
    init: () => {
        var self = pomodoro;
        pomodoro.started = false;
        pomodoro.elements.time = document.querySelector('span.time');
        pomodoro.elements.startWork = document.querySelector('#startWork');
        pomodoro.elements.startShortBreak = document.querySelector('#startShortBreak');
        pomodoro.elements.startLongBreak = document.querySelector('#startLongBreak');
        pomodoro.elements.stop = document.querySelector('#stop');
        pomodoro.interval = setInterval(() => {
            self.intervalCallback.apply(self);
        }, 1000);
        pomodoro.elements.startWork.onclick = () => {
            self.startWork.apply(self);
        };
        pomodoro.elements.startShortBreak.onclick = () => {
            self.startShortBreak.apply(self);
        };
        pomodoro.elements.startLongBreak.onclick = () => {
            self.startLongBreak.apply(self);
        };
        pomodoro.elements.stop.onclick = () => {
            self.stopTimer.apply(self);
        };
    },
    resetVariables: (time, started) => {
        pomodoro.time = time;
        pomodoro.started = started;
    },
    startWork: () => {
        pomodoro.resetVariables(25*60, true);
    },
    startShortBreak: () => {
        pomodoro.resetVariables(5*60, true);
    },
    startLongBreak: () => {
        pomodoro.resetVariables(15*60, true);
    },
    stopTimer: () => {
        pomodoro.resetVariables(25*60, false);
        pomodoro.updateDom();
    },
    toHumanReadableTime: (seconds) => {
        let sec = 0, 
        min = 0, 
        hrs = 0;
        sec = seconds;
        while (sec >= 60) {
        sec -= 60;
        min += 1;
        }
        while (min >= 60) {
        min -= 60;
        hrs += 1;
        }
        sec = (sec<=9) ? '0'+sec.toString() : sec.toString();
        min = (min<=9) ? '0'+min.toString() : min.toString();
        hrs = (hrs<=9) ? '0'+hrs.toString() : hrs.toString();
        let time = hrs +':'+ min +':'+ sec;
        return time;
    },
    updateDom: () => {
        pomodoro.elements.time.innerText = pomodoro.toHumanReadableTime(pomodoro.time);
    },
    intervalCallback: () => {
        if (!pomodoro.started) return false;
        if (pomodoro.time == 0) {
            pomodoro.timerComplete();
            return;
        }
        pomodoro.time--;
        pomodoro.updateDom();
    },
    timerComplete: function(){
        pomodoro.started = false;
    }
}

function humanReadableTime(seconds) {
    let sec = 0, 
        min = 0, 
        hrs = 0;
    sec = seconds;
    while (sec >= 60) {
      sec -= 60;
      min += 1;
    }
    while (min >= 60) {
      min -= 60;
      hrs += 1;
    }
    sec = (sec<=9) ? '0'+sec.toString() : sec.toString();
    min = (min<=9) ? '0'+min.toString() : min.toString();
    hrs = (hrs<=9) ? '0'+hrs.toString() : hrs.toString();
    let time = hrs +':'+ min +':'+ sec;
    return time;
}

window.onload = () => {
    pomodoro.init();
};





