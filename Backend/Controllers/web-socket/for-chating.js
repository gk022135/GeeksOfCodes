const webSocketCall = require('./conncetion');
const userModel = require('../../Models/UserSchema');
const jwtVarification = require('../../Middlewares/jwtvarification')
const map = new Map();


//user authentication for setu the web socket
async function personalize_chat(req, res) {
    try {
        const { userA_id, userB_id } = req.body;

        const isUserA = await userModel.find({ email: userA_id });
        if (!isUserA) return res.status(403).json({
            message: "user not exist",
            success: false
        })

        //get token from header
        const authHeader = await req.headers['authorization'];
        const token = authHeader ? authHeader.myjwt : "null";

        const isVarified = await jwtVarification(token);
        if (!isVarified) return res.status(403).json({
            message: "unauthorized action",
            success: false
        })

        // setup the websocket to userB_id == email id of user B
        // maintain the queue
        const isWebsocket = await webSocketCall({ path });
        isWebsocket.on('connection', function (ws, request) {
            map.set(userA_id, ws);

            ws.on('error', console.error);

            ws.on('message', function (message) {
                console.log('📨 Received:', message);

                try {
                    const parsed = JSON.parse(message);
                    console.log('Parsed message:', parsed);
                } catch {
                    console.log('Message is not JSON, broadcasting as-is.');
                }
                if( !map.find(userB_id)){
                    return res.JSON({
                        message : "user is offline",
                        success : false
                    })
                    ws.on('close', function(){
                        //close websocket for both user a and b
                        map.delete(userA_id);
                    })
                }
                wss.clients.forEach(client => {
                    //send message to only user B and no one
                    if (client === userB_id && client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });

            ws.on('close', function () {
                map.delete(userA_id);
            });
        })

    } catch (error) {

    }
}

module.exports = personalize_chat;