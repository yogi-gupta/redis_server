const net = require('net');

const dataStore = {}; // A simple in-memory data store

const server = net.createServer((client) => {
    console.log('Client connected');

    client.on('data', (data) => {
        const request = data.toString().trim();
        const [command, key, value] = request.split(' ');

        if (command === 'SET') {
            dataStore[key] = value;
            client.write('OK\r\n');
        } else if (command === 'GET') {
            const storedValue = dataStore[key];
            if (storedValue) {
                client.write(`${storedValue}\r\n`);
            } else {
                client.write('(nil)\r\n');
            }
        } else {
            client.write('-Error: Unsupported command\r\n');
        }
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });

    client.on('error', (err) => {
        console.error('Client socket error:', err);
    });
});

server.listen(6379, '0.0.0.0', () => {
    console.log('Simple Redis Server is running on port 6379');
});
