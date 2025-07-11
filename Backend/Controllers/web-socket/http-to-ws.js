// controller-websocket/http-to-ws.js

const WebSocket = require('ws');
const jwtVerification = require('../../Middlewares/jwtvarification');
const cookie = require('cookie');

const userMap = new Map(); // email => WebSocket connection

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ noServer: true });

  server.on('upgrade', async (req, socket, head) => {
    try {
        // console.log("hello ji working ??")
      const cookies = cookie.parse(req.headers.cookie || '');
    //   console.log("hello ji working ??",cookies)
      const authHeader = req.headers['authorization'];
      const token = cookies.Myjwt || (authHeader?.split(' ')[1]);
    //   console.log(token)

      if (!token) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      const userData = await jwtVerification({token}); // result is boolean
      if (!userData.success) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      req.userEmail = userData.email;

      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } catch (err) {
      console.error('Upgrade error:', err);
      socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
      socket.destroy();
    }
  });

  wss.on('connection', (ws, req) => {
    const userEmail = req.userEmail;
    userMap.set(userEmail, ws);
    console.log(`🟢 ${userEmail} connected`);

    ws.on('message', (msg) => {
      try {
        const { to, content } = JSON.parse(msg);
        const recipient = userMap.get(to);

        if (recipient && recipient.readyState === WebSocket.OPEN) {
          recipient.send(JSON.stringify({ sender: userEmail, text: content }));
        } else {
          ws.send(JSON.stringify({ error: 'User is offline or unavailable.' }));
        }
      } catch (err) {
        ws.send(JSON.stringify({ error: 'Invalid message format.' }));
      }
    });

    ws.on('close', () => {
      userMap.delete(userEmail);
      console.log(`🔴 ${userEmail} disconnected`);
    });

    ws.on('error', (err) => {
      console.error(`WebSocket error (${userEmail}):`, err);
    });
  });

  console.log('✅ WebSocket server ready for authenticated connections');
}

module.exports = setupWebSocket;
