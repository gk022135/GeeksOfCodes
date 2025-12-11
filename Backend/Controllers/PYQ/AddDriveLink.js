const Pyq = require("../../Models/Pyqschema");
const User = require("../../Models/UserSchema");


function parseEmail(email) {
    const branchMap = {
        cs: "Computer Science",
        ec: "Electronics and Communication",
        ce: "Civil Engineering",
        me: "Mechanical"
    };

    // try to extract two-digit year and 2-letter branch code from the email (e.g. "20cs123@...")
    const match = (email || "").match(/(\d{2})([a-z]{2})/i);
    const year = match ? parseInt(match[1], 10) : new Date().getFullYear() % 100;
    const branchCode = match ? match[2].toLowerCase() : "";

    const department = branchMap[branchCode] || "Unknown";
    // calculate current semester
    const currentYear = new Date().getFullYear() % 100;
    const diff = currentYear - year;
    const semester = diff * 2 + 1;
    return { department, semester };
}


module.exports = parseEmail;



// POST — Add PYQ
async function  AddPyq(req, res){
    try {
        const { email, subject, courseCode, driveLink, cloudinary_link } = req.body;


        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });


        const { department, semester } = parseEmail(email);


        const pyq = await Pyq.create({
            contributer: user._id,
            department,
            subject,
            courseCode,
            semester,
            driveLink,
            cloudinary_link,
        });


        res.json(pyq);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET — Fetch all PYQ
async function GetAllPyq(req, res){
    try {
        const pyqs = await Pyq.find().populate("contributer", "name email");
        res.json(pyqs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { AddPyq, GetAllPyq };