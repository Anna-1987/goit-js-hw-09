import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
            if (selectedDates[0] < Date.now() || selectedDates[0] === new Date()) {
                Notify.failure('Please choose a date in the future');
              } else {
                refs.startBtn = true;
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
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  const timer = {
    intervalId: null,
    isActive:false,
    
    start (){
      if (this.isActive){
        return;
      }
    
    const finishTime = selectedTime;
    this.isActive = true;

    this.intervalId = setInterval (() => {
         const currentTimer = Date.now();
         const ms = finishTime - currentTimer;
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






