const app = require('./src/server');
const server = require('http').createServer(app);

// * Creando el socket
const io = require('./src/sockets/socket').init( server );
io.on('connection', (socket) => {
    console.log('cliente nuevo', socket.id);

    socket.on('disconnect', ()=> {
        console.log('cliente desconectado', socket.id);
    })
})


// * Routes
const router = require('./src/routes/routes');
app.use('/api', router);


// * Funcion para iniciar el server
async function init(){
    server.listen( app.get('port'), ()=> {
        console.log(`server on ${ app.get('port') }`);
    })
}
init();


