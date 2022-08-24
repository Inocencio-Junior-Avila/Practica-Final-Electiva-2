const socket = io();

// * Variable global que toma el intervalo del contador
let intervalCounter;



// * Cuadro principal
const div = document.getElementById("v");

// * Partes del semaforo
let circles = document.querySelectorAll('.circle-item');

// * Timer principal
let timer = setInterval(()=> {
        
    startTraffic();

}, 1000 * 32)

// * Funcion para parar intervalo
function StopTimer() {
    clearInterval(timer);
}


document.addEventListener("DOMContentLoaded", (e) => {

    startTraffic();

});

// * Varios timeout para simular el semaforo
const startTraffic = (time = 8) => {
    
    socket.emit('green-client', '');        
    
    // * para cambiar a verde
    setTimeout(()=> {

        socket.emit('green-client', '');        

        //todo Para cambiar a amarillo
        setTimeout(()=> {
           

            socket.emit('yellow-client', '');

            //! Para cambiar a rojo
            setTimeout(()=> {
                
                socket.emit('red-client', '')

                //todo Para cambiar a amarillo
                setTimeout(()=> {
                    
                    socket.emit('yellow-client', '');
                
                }, 1000 * (time))

            }, 1000 * (time));

        }, 1000 * (time))

    }, 1000 * time)   
}



// * Listeners de socket.io
socket.on('red', data =>{
    // console.log('red')
    emptyTraffic()
    let circle = document.querySelector(`.${data.class}`)
    circle.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('yellow', data =>{
    // console.log('yellow')
    emptyTraffic()
    let circle = document.querySelector(`.${data.class}`)
    circle.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('green', data =>{
    // console.log('green')
    emptyTraffic()
    let circle = document.querySelector(`.${data.class}`)
    circle.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('stop-server', data => {

    
    emptyTraffic();
    socket.emit('stop-socket', '');
    
    circles[1].classList.add('circle2-on');
    div.style.background = 'yellow';


    //! Para cambiar a rojo
    setTimeout(()=> {
        circles[1].classList.remove('circle2-on');
        circles[2].classList.add('circle3-on');
        div.style.background = 'red';

        setTimeout(()=> {
            console.log('conectado again!!!')
            socket.connect();
        }, 1000 * 12);

    }, 1000 * 10);
 
    
})

socket.on('cancel-server', data => {
    
    emptyTraffic();
    socket.connect();
    timer = setInterval(()=> {
        
        startTraffic(15);
        
    }, 1000 * 61)
    
})

// * Funcion para limpiar el semaforo antes de que cambie
const emptyTraffic = () => {
    let circles = document.querySelectorAll('.circle-item');
    for(let i = 0; i < circles.length; i++ ) {
        circles[i].classList.remove(`circle${i+1}-on`);
    }
}

