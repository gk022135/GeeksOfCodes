const mongoose = require("mongoose");
const { Schema } = mongoose;

const GatepassSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  entryTime: { type: Date, required: true, default: Date.now },
  exitTime: { type: Date, default: null },
});

module.exports = mongoose.model("Gpass", entryExitSchema);
