import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000/api/pyq";

const UploadPYQ = () => {
    const [pdf, setPdf] = useState(null);
    const [driveLink, setDriveLink] = useState("");
    const [pyqs, setPyqs] = useState([]);
    const [email, setEmail] = useState("");
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");
    const [course_code, setcourse_code] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("UserData"));
        if (!userData?.email || !userData.email.endsWith("@smvdu.ac.in")) {
            setMessage("Only verified @smvdu.ac.in users can upload.");
            return;
        }
        setEmail(userData.email);
        fetchPYQs();
    }, []);

    const fetchPYQs = async () => {
        try {
            const res = await fetch(`${BASE_URL}/all`);
            setPyqs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const uploadPDF = async () => {
        if (!pdf) return alert("Select PDF");
        if (!semester || !year || !department || !course_code)
            return alert("Fill all fields: semester, year, department, course_code");

        const formData = new FormData();
        formData.append("pdf", pdf);
        formData.append("email", email);
        formData.append("semester", semester);
        formData.append("year", year);
        formData.append("department", department);
        formData.append("course_code", course_code);

        try {
            const res = await axios.post(`${BASE_URL}/upload-pdf`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(res.data.message);
            setPdf(null);
            fetchPYQs();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error uploading PDF");
        }
    };

    const shareDriveLink = async () => {
        if (!driveLink) return alert("Enter Drive Link");
        if (!semester || !year || !department || !course_code)
            return alert("Fill all fields: semester, year, department, course_code");

        try {
            const res = await axios.post(`${BASE_URL}/share-link`, {
                email,
                link: driveLink,
                semester,
                year,
                department,
                course_code,
            });
            setMessage(res.data.message);
            setDriveLink("");
            fetchPYQs();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error sharing link");
        }
    };

    // Optional: filter PYQs by semester/year/department/course_code
    const filteredPYQs = pyqs.filter(p => {
        return (!semester || p.semester === semester) &&
               (!year || p.year === year) &&
               (!department || p.department === department) &&
               (!course_code || p.course_code === course_code);
    });

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Upload PYQ</h2>

            {message && <p className="mb-4 text-red-500">{message}</p>}

            <div className="mb-4 flex flex-col gap-2">
                <label className="block mb-1">Upload PDF</label>
                <input type="file" accept="application/pdf" onChange={e => setPdf(e.target.files[0])} />
                <button onClick={uploadPDF} className="px-3 py-1 bg-blue-600 text-white rounded mt-1">Upload</button>
            </div>

            <div className="mb-4 flex flex-col md:flex-row gap-2">
                <input placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} className="border p-2 rounded w-full" />
                <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="border p-2 rounded w-full" />
                <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} className="border p-2 rounded w-full" />
                <input placeholder="course_code" value={course_code} onChange={e => setcourse_code(e.target.value)} className="border p-2 rounded w-full" />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Share Drive Link</label>
                <input type="text" value={driveLink} onChange={e => setDriveLink(e.target.value)} placeholder="Drive link" className="border p-2 w-full rounded mb-1" />
                <button onClick={shareDriveLink} className="px-3 py-1 bg-green-600 text-white rounded">Share</button>
            </div>

            <h3 className="text-lg font-bold mb-2">All PYQs Uploaded By {email} (you)</h3>
            <div className="space-y-2">
                {filteredPYQs.map((p, idx) => (
                    <div key={idx} className="border p-2 rounded flex justify-between items-center">
                        <div className="flex flex-col">
                            <span>{p.filename || p.driveLink}</span>
                            <span className="text-sm text-gray-500">{p.semester} | {p.year} | {p.department} | {p.course_code}</span>
                        </div>
                        {p.filename && (
                            <a href={`/uploads/pyq/${p.filename}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Preview</a>
                        )}
                        {p.driveLink && (
                            <a href={p.driveLink} target="_blank" rel="noopener noreferrer" className="text-green-500">Open Link</a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadPYQ;
