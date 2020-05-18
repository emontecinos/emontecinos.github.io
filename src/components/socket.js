import io from 'socket.io-client';

const socket = io('wss://le-18262636.bitzonte.com', {
    path: '/stocks',
    transports: ['websocket','polling']
});

// var exchange_info;
// var stocks_info;

// function GetSocketInfo() {
//     socket.emit('EXCHANGES');
//     socket.on('EXCHANGES',(data) => {
//         exchange_info = data;
// });
// }
// function GetStocksInfo() {
//     socket.emit('STOCKS');
//     socket.on('STOCKS',(data) => {
//         stocks_info = data;
// });
// }
// export {socket},{stocks_info},{exchange_info};
