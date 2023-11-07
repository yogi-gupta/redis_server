const net = require('net');

const client = new net.Socket();

client.connect(6379, '127.0.0.1', () => {
    console.log('Connected to Simple Redis Server');

    // Send SET command to set a key-value pair
    client.write('SET myKey Hello\r\n');

    // Send GET command to retrieve the value of a key
   client.write('GET myKey\r\n');
});

client.on('data', (data) => {
    const response = data.toString();
    console.log('Server Response:', response);
    client.end(); // Close the connection after receiving the response
});

client.on('end', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error(`Client socket error: ${err}`);
});
