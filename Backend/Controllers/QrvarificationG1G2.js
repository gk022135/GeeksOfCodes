const UserModel = require("../Models/UserSchema");
const GatepassModel = require("../Models/GatepassModel");
const AdminModel = require("../Models/AdminModel"); // Assuming AdminModel is used

async function QrvarificationG1G2(req, res) {
  try {
    const { qrvalue, email } = req.query;
    console.log("QR details:", req.query);

    if (!qrvalue || !email) {
      return res.status(400).json({
        message: "Missing email or wrong QR scanned",
        success: false,
      });
    }

    const qrPrefix = qrvalue.substring(0, 4).toUpperCase(); // Fix function name
    const adminData = await AdminModel.findOne().select("Entry_Qr Exit_Qr");

    if (!adminData || (adminData.Entry_Qr != qrvalue && adminData.Exit_Qr != qrvalue)) {
      return res.status(404).json({
        message: "Wrong QR code",
        success: false,
      });
    }

    const userPresent = await UserModel.findOne({ email });
    if (!userPresent) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    const userID = userPresent._id;
    const timing = new Date().toISOString(); // Fix incorrect Date.now()

    // Get the latest gatepass record
    const lastGatePass = await GatepassModel.findOne({ userId: userID }).sort({ _id: -1 });

    if (qrPrefix === "EXIT") {
      if (!lastGatePass || lastGatePass.firstQrExit === false) {
        // Allow exit only if last entry exists and firstQrExit is false
        const newExit = new GatepassModel({
          userId: userID,
          exitTime: timing,
          firstQrExit: true,
        });

        await newExit.save();
        return res.status(200).json({
          message: "Exit recorded successfully.",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "You have already exited. Please enter first.",
          success: false,
        });
      }
    }

    if (qrPrefix === "ENTR") {
      if (lastGatePass && lastGatePass.firstQrExit === true) {
        // Allow entry only if last exit exists and firstQrExit is true
        const newEntry = new GatepassModel({
          userId: userID,
          entryTime: timing,
          firstQrExit: false,
        });

        await newEntry.save();
        return res.status(200).json({
          message: "Entry recorded successfully.",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "You must exit first before making a new entry.",
          success: false,
        });
      }
    }

    return res.status(400).json({
      message: "Invalid QR code type.",
      success: false,
    });
  } catch (error) {
    console.error("Error in making entry/exit:", error);
    return res.status(500).json({
      message: "Server-side error",
      success: false,
    });
  }
}

module.exports = QrvarificationG1G2;


//testing not done for it 
