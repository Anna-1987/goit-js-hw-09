!function(){var t={bodyColor:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){n.start()})),t.stopBtn.addEventListener("click",(function(){n.stop()}));var n={intervalId:null,isActiv:!1,start:function(){this.isActiv||(this.isActiv=!0,this.intervalId=setInterval((function(){var n="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.bodyColor.style.backgroundColor=n}),1e3))},stop:function(){clearInterval(this.intervalId),this.isActiv=!1}}}();
//# sourceMappingURL=01-color-switcher.0059f729.js.map
