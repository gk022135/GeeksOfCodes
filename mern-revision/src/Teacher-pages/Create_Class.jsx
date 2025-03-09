import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from 'react-toastify';

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
      // Check Faculty Department Before Submission
      const FacultyInfo = localStorage.getItem("UserData");
      const FacultyDep = FacultyInfo ? JSON.parse(FacultyInfo).Department : null;

      console.log("fac dep",FacultyDep)

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

      // Reset form after submission
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
    <div className="text-white relative h-auto">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 w-4/5">
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <span>
            <label>Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={courseData.courseCode}
              onChange={handleChange}
              className="border rounded p-1"
              required
            />
          </span>
          <span>
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={courseData.courseName}
              onChange={handleChange}
              className="border rounded p-1"
              required
            />
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <span>
            <label>Expiry On</label>
            <input
              type="date"
              name="enddate"
              value={courseData.enddate}
              onChange={handleChange}
              className="border rounded p-1"
              required
            />
          </span>
          <span>
            <label>Allow From</label>
            <input
              type="text"
              name="startEntry"
              value={courseData.startEntry}
              onChange={handleChange}
              className="border rounded p-1"
              required
            />
          </span>
          <span>
            <label>To</label>
            <input
              type="text"
              name="endEntry"
              value={courseData.endEntry}
              onChange={handleChange}
              className="border rounded p-1"
              required
            />
          </span>
        </div>

        <label>Teacher Name</label>
        <input
          type="text"
          name="Teacher"
          value={courseData.Teacher}
          onChange={handleChange}
          className="border rounded p-1"
          required
        />

        <div className="flex items-center gap-2">
          <label>Is Active?</label>
          <input
            type="checkbox"
            name="isActive"
            checked={courseData.isActive}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2 text-white bg-black">
          <label htmlFor="department">School Of</label>
          <select
            id="department"
            name="Department"
            value={courseData.Department}
            onChange={handleChange}
            className="flex border rounded px-2 py-1 items-center gap-2 text-white bg-black"
          >
            <option value="">Select An Option</option>
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create A Class
        </button>
      </form>

      {res && (
        <h1
          className={`${
            res.success ? "bg-green-500" : "bg-red-500"
          } rounded p-2 w-1/6 font-bold text-black`}
        >
          {res.message}
        </h1>
      )}
     
       {!isDepartment && (<h1
          className="rounded p-2 w-1/6 font-bold text-black bg-red-600"
        >ou are not authorized to create a course in this department.
          
        </h1>)}
     

      <ToastContainer />
    </div>
  );
}

export default Create_class;
