import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs= {
    startBtn:document.querySelector('button[data-start]'),
    input:document.querySelector('#datetime-picker'),
    spanDay:document.querySelector('span[data-days]'),
    spanHour:document.querySelector('span[data-hours]'),
    spanMinute:document.querySelector('span[data-minutes]'),
    spanSecond:document.querySelector('span[data-seconds]'),
}

refs.startBtn.addEventListener('click', ()=> {
    timer.start();
    
    })

    flatpickr('#datetime-picker', {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            if (selectedDates[0] < Date.now()) {
                window.alert('Please choose a date in the future');
                selectedDates[0] = new Date();
              } else {
                refs.startBtn = false;
                selectedTime = selectedDates[0];
              }
        },
});


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  const timer = {
    intervalId: null,
    isActive:false,
    
    start (){
      if (this.isActive){
        return;
      }

    this.isActive = true;
    this.intervalId = setInterval (() => {
         const currentTimer = Date.now();
         const ms = selectedTime - currentTimer;
         const time = convertMs(ms);
        // console.log(`${days}:${hours}:${minutes}:${seconds}`);
         updateClockTime(time);
      if (ms <= 0) {
        this.stopTimer();
      }
        }, 1000);
    },
    stopTimer(){
        clearInterval(this.intervalId);
        this.isActive = false;
      }
    };

function updateClockTime({days, hours, minutes, seconds}){
    refs.spanDay.textContent = days;
    refs.spanHour.textContent = hours;
    refs.spanMinute.textContent = minutes;
    refs.spanSecond.textContent = seconds;  
};





