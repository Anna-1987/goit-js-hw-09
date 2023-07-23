const refs = {
    bodyColor:document.querySelector('body'),
    startBtn:document.querySelector('button[data-start]'),
    stopBtn:document.querySelector('button[data-stop]'),
}
refs.startBtn.disabled = false;
refs.startBtn.addEventListener('click', () => {
    changeColor.start();   

});

refs.stopBtn.addEventListener('click', ()=> {
    changeColor.stop();
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const changeColor = {
    intervalId: null,
    isActiv: false,
  
    
    start(){

      if (this.isActiv){
         return;
      }
      this.isActiv = true;
        this.intervalId = setInterval (() =>{
        const colorBody = getRandomHexColor();
        refs.bodyColor.style.backgroundColor = colorBody;
        refs.startBtn.disabled = false;
        refs.startBtn.disabled = true;
      }, 1000)

    },

    stop(){
        clearInterval(this.intervalId);
        this.isActiv = false;
        refs.startBtn.disabled = false;
    },
   
}