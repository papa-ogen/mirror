import io from 'socket.io-client';

const socket = io('http://localhost:9696');

export default socket;