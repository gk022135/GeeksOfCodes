import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

function Create_class() {
  const { SendDataSignLogin } = useContext(AppContext);
  const [res, setRes] = useState(null);
  const [isDepartment, setDepartment] = useState(true)
  const [courseData, setCourseData] = useState({
    courseName: "",
    Teacher: "",
    courseCode: "",
    isActive: false,
    createdAt: Date.now(),
    enddate: "",
    startEntry: "",
    endEntry: "",
    Department: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Course Data:", courseData);

    try {
      const FacultyInfo = localStorage.getItem("UserData");
      const FacultyDep = FacultyInfo ? JSON.parse(FacultyInfo).Department : null;
      console.log("fac dep", FacultyDep);

      if (FacultyDep !== courseData.Department) {
        setDepartment(false)
        toast.error("You are not authorized to create a course in this department.");
        return;
      }

      const response = await SendDataSignLogin("ClassCreate", courseData);
      setRes(response);
      console.log("Server Response:", response);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }

      setCourseData({
        courseName: "",
        Teacher: "",
        courseCode: "",
        isActive: false,
        createdAt: Date.now(),
        enddate: "",
        startEntry: "",
        endEntry: "",
        Department: "",
      });

    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("An error occurred while creating the course.");
    }
  };

  return (
    <div className="text-white relative min-h-screen flex flex-col items-center justify-start py-8 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 bg-gray-800 shadow-lg p-6 rounded-2xl w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <MdOutlineCreateNewFolder className="text-blue-400" />
          Create New Class
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={courseData.courseCode}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={courseData.courseName}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">Expiry On</label>
            <input
              type="date"
              name="enddate"
              value={courseData.enddate}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">Allow From (Start Entry)</label>
            <input
              type="text"
              name="startEntry"
              value={courseData.startEntry}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">To (End Entry)</label>
            <input
              type="text"
              name="endEntry"
              value={courseData.endEntry}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-30"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm mb-1">
            <FaChalkboardTeacher />
            Teacher Name
          </label>
          <input
            type="text"
            name="Teacher"
            value={courseData.Teacher}
            onChange={handleChange}
            className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm">Is Active?</label>
          <input
            type="checkbox"
            name="isActive"
            checked={courseData.isActive}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm mb-1">
            <HiOutlineBuildingLibrary />
            Department
          </label>
          <select
            id="department"
            name="Department"
            value={courseData.Department}
            onChange={handleChange}
            className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="ECE">Electronics & Communication Engineering</option>
            <option value="EE">Electrical Engineering</option>
            <option value="CE">Civil Engineering</option>
            <option value="MEC">Mechanical Engineering</option>
            <option value="BIOTECH">Biotechnology & Engineering</option>
            <option value="BBA">Bachelor of Business Administration</option>
            <option value="MBA">Master of Business Administration</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md flex items-center justify-center gap-2 transition"
        >
          <AiOutlineFieldTime className="text-xl" />
          Create Class
        </button>
      </form>

      {res && (
        <h1
          className={`${
            res.success ? "bg-green-500" : "bg-red-500"
          } mt-6 p-3 rounded-md font-bold w-full max-w-md text-center text-black`}
        >
          {res.message}
        </h1>
      )}
     
      {!isDepartment && (
        <h1 className="bg-red-600 mt-4 p-3 rounded-md font-bold w-full max-w-md text-center text-black">
          You are not authorized to create a course in this department.
        </h1>
      )}

      <ToastContainer />
    </div>
  );
}

export default Create_class;
