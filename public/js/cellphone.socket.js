const cellphone_socket = io();

let pararConteo = false;

// * Variable global que toma el intervalo del contador
let intervalCounter;

// * Contador
let count = document.querySelector('#count');  

let iniciar = document.querySelector('#iniciar');
let cancelar = document.querySelector('#cancelar');

iniciar.addEventListener('click', ()=> {

    
    UpdateCounter();
    VoiceCountdown();

    cellphone_socket.emit('stop-client', '');

    iniciar.disabled = true;
    cancelar.disabled = false;
    setTimeout(()=> {

        
        StopCounter();
        cellphone_socket.connect();
        Talk('Tienes 12 segundos para cruzar', pararConteo);
        
    }, 1000 * 10)
});

cancelar.addEventListener('click', ()=> {
    
    pararConteo = true;
    cellphone_socket.emit('cancel-client', '');
    
    VoiceCountdown( true );
    StopCounter();
    Talk('La petición ha sido cancelada, reintenta de nuevo en 10 segundos');
    
    setTimeout(()=> {
        iniciar.disabled = false;
        cancelar.disabled = true;
        pararConteo = false;
    }, 1000 * 10)
})

cellphone_socket.on('reconnected', data => {
    Talk('Ya el tránsito está cerca',pararConteo);
    console.log(data);
    iniciar.disabled = false;
    cancelar.disabled = true;
})

// * Variable para la voz
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

// *  Array global para las voces
let voices = [];

// * Aqui asignamos las voces a la variable voices
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
}

const Talk = ( say, stop ) => {
    let speak = new SpeechSynthesisUtterance(say);
        speak.lang = 'es-DO';
        speak.voice = voices[4];

    if(stop){
        window.speechSynthesis.cancel();
    }else {
        window.speechSynthesis.speak(speak);
    }
   
}

// * Aqui iniciamos el conteo usando la voz
const VoiceCountdown = ( stop = false) => {
    
    for(let i = 10; i >= 1 ; i-- ) {
        
        if(stop){
            Talk(i, true);
        }else{
            Talk(i);
        }
    }
}

// * Aqui actualizamos el contador de la pantalla al iniciar el conteo
const UpdateCounter = ( ) => {
    
    let i = 10;

    intervalCounter = setInterval(()=>{
        
        count.innerHTML = i;
        i--;

    },1000);
   
        
    
}

// * Esta funcion se utiliza al cancelar, para parar el UpdateCounter
const StopCounter = () => {
    clearInterval(intervalCounter);
    count.innerHTML = ''; 
}