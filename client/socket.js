import io from 'socket.io-client';

const socket = io.connect('http://localhost:9696');

export default socket;