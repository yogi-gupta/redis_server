const net = require('net');

const server = net.createServer((client) => {
    console.log('Client connected');

    client.on('data', (data) => {
        const request = data.toString();
        const response = processRequest(request);
        client.write(response);
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });

    client.on('error', (err) => {
        console.error('Client socket error:', err);
    });
});

server.listen(6379, '0.0.0.0', () => {
    console.log('Echo Server is running on port 6379');
});

function processRequest(request) {
    const deserializedRequest = deserializeRESP(request);

    if (deserializedRequest) {
        return serializeRESP(deserializedRequest);
    } else {
        return serializeRESP('-Error: Unsupported command\r\n');
    }
}

function deserializeRESP(request) {
    if (request.startsWith('$')) {
        const dataLength = parseInt(request.substring(1, request.indexOf('\r\n')));
        return request.substring(request.indexOf('\r\n') + 2, request.indexOf('\r\n') + 2 + dataLength);
    } else {
        return request;
    }
}

function serializeRESP(response) {
    return '$' + response.length + '\r\n' + response + '\r\n';
}
