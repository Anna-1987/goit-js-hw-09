import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedTime = null;

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

    flatpickr(refs.input, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            if (selectedDates[0] < Date.now() || selectedDates[0] === new Date()) {
                Notify.failure('Please choose a date in the future');
                refs.startBtn.classList.remove('style-btn');
                } else {
                refs.startBtn.classList.add('style-btn');
                selectedTime = selectedDates[0];
                refs.startBtn.disabled = false;
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
    isActive: false,
        
    start (){
      if (this.isActive) {
        return;
      }
    
    this.isActive = true;

    this.intervalId = setInterval (() => {
         const currentTimer = Date.now();
         const deltaTime = selectedTime - currentTimer;
         const time = convertMs(deltaTime);
        // console.log(`${days}:${hours}:${minutes}:${seconds}`);
         updateClockTime(time);
      if (deltaTime <= 0) {
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






