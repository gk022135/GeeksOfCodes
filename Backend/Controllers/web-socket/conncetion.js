const WebSocket = require('ws');

let clients = [];

module.exports = function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server }); // attach to same server

  wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('New WebSocket client connected');

    ws.on('message', (message) => {
      // Broadcast to all other clients
      
      clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      clients = clients.filter(client => client !== ws);
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server attached');
};
