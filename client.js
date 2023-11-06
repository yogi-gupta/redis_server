const net = require('net');

const client = new net.Socket();

client.connect(6379, '127.0.0.1', () => {
    console.log('Connected to Redis Lite server');

    // Send commands to the server
    client.write(serializeRequest('PING'));

    // You can send more commands here, e.g., client.write(serializeRequest('GET key'));

    // End the connection
    client.end();
});

client.on('data', (data) => {
    const response = data.toString();
    console.log('Server Response:', response);
});

client.on('end', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error(`Client socket error: ${err}`);
});

function serializeRequest(command) {
    return `\$${command.length}\r\n${command}\r\n`;
}
