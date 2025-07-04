const WebSocket = require('ws');
const jwtVerification = require('../../Middlewares/jwtvarification');
const cookie = require('cookie');

const userMap = new Map(); // email -> WebSocket

function setupWebSocket(server) {
    console.log("hey upgradation procees on");
    const wss = new WebSocket.Server({ noServer: true }); // we'll manually upgrade

    // Upgrade HTTP(S) request to WebSocket
    server.on('upgrade', async (request, socket, head) => {
        try {
            console.log("auth start\n")
            const cookies = cookie.parse(request.headers.cookie || '');
            console.log("cookies are delisoious", cookie)
            const authHeader = request.headers['authorization'];

            const token = cookies.myjwt || (authHeader?.split(' ')[1]);

            if (!token) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }
            console.log("token validation done\n");
            const userData = await jwtVerification(token);
            if (!userData || !userData.email) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }


            request.userEmail = userData.email; // attach email for later
            wss.handleUpgrade(request, socket, head, function done(ws) {
                console.log("try to start the server")
                wss.emit('connection', ws, request);
            });

        } catch (err) {
            console.error('Upgrade error:', err);
            socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
            socket.destroy();
        }
    });

    // Handle WebSocket messages
    wss.on('connection', (ws, request) => {
        const userEmail = request.userEmail;
        userMap.set(userEmail, ws);
        console.log(`🟢 ${userEmail} connected`);

        ws.on('message', (message) => {
            try {
                const { to, content } = JSON.parse(message);
                const recipientSocket = userMap.get(to);

                if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
                    recipientSocket.send(JSON.stringify({
                        from: userEmail,
                        content
                    }));
                } else {
                    ws.send(JSON.stringify({ error: 'User is offline' }));
                }
            } catch (err) {
                ws.send(JSON.stringify({ error: 'Invalid message format' }));
            }
        });

        ws.on('close', () => {
            console.log(`🔴 ${userEmail} disconnected`);
            userMap.delete(userEmail);
        });

        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
        });
    });

    console.log('✅ WebSocket server is ready to accept secure upgrades');
}

module.exports = setupWebSocket;
