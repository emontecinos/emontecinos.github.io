const server=require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
    transports:['websocket','polling']
});

// listen for socket connections
let tic=0;
io.on('connection',client=>{
    setInterval(() => {
        os.cpuUsage((cpuPercent) => {
            client.emit('cpu',{
                name:tic++,
                value: cpuPercent
            });
        });
    }, 1000);
});
// every second emit a cpu event to user

server.listen(3000);