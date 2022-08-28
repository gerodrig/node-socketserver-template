

//HTML references
const lblOnline = document.querySelector('#lblOnline'); 
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');


const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('server-message', (payload) => {
    console.log('Message recived from server', payload);
});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: socket.id,
        date: new Date().getTime()
    }
    socket.emit('send-message', payload, (id) => {
        console.log('Message delivered to server', id);
    });
});

