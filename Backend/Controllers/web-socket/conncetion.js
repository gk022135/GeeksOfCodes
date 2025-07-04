const WebSocket = require('ws');
const jwtVerification = require('../../Middlewares/jwtvarification');

const userMap = new Map(); // email -> ws

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async (ws, request) => {
        const params = new URLSearchParams(request.url.replace(/^\/\?/, ''));
        const token = params.get('token');
        const userId = params.get('user'); // user's email or ID

        const isValid = await jwtVerification({token});
        if (!isValid) {
            ws.close();
            return;
        }

        // Store the connection
        userMap.set(userId, ws);

        ws.on('message', (message) => {
            try {
             
                const { to, content } = JSON.parse(message);
                const recipientSocket = userMap.get(to);

                 console.log("message",to, content, recipientSocket)

                if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
                    recipientSocket.send(JSON.stringify({
                        from: userId,
                        content
                    }));
                } else {
                  console.log("error user offline")
                    ws.send(JSON.stringify({ error: 'User is offline' }));
                }
            } catch (err) {
                ws.send(JSON.stringify({ error: 'Invalid message format' }));
            }
        });

        ws.on('close', () => {
            userMap.delete(userId);
        });

        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
        });
    });

    console.log('✅ WebSocket server is running');
}

module.exports = setupWebSocket;
