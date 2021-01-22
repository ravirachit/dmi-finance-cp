function bindEvent(element,eventName,eventHandler){
    if(element.addEventListener){
        element.addEventListener(eventName,eventHandler,false);
    }else if(element.attachEvent){
        element.attachEvent('on' + eventName , eventHandler);
    }
}

bindEvent(window, 'message' , function(e) {
    if(e.data=='RZP Success'){
        sessionStorage.setItem('callback',1);
        var handleEvent = document.querySelector("#loanRestruct");
        handleEvent.addEventListener("click",document.getElementById('cancelModal').click(),false)
    }
    else if(e.data=="RZP Pop-up Close"){
        sessionStorage.setItem('callback',2)
        var handleEvent = document.querySelector("#loanRestruct");
        handleEvent.addEventListener("click",document.getElementById('cancelModal').click(),false)
    }
    else if(e.data=="Submitted Close"){
        sessionStorage.setItem('callback',3);
        var handleEvent = document.querySelector("#loanRestruct");
        handleEvent.addEventListener("click",document.getElementById('cancelModal').click(),false)
    }
});