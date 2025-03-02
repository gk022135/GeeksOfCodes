import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from 'react-toastify'

function Create_class() {
  const { SendDataSignLogin } = useContext(AppContext)
  const [res, setRes] = useState(null)
  const [courseData, setCourseData] = useState({
    courseName: "",
    Teacher: "",
    courseCode: "",
    isActive: false,
    createdAt: Date.now(),
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
      const response = await SendDataSignLogin("ClassCreate", courseData)
      setRes(response);
      console.log("hello ji", response)

      if (response.success) {
        toast.success(response.message)
      }
      if (!response.success) {
        toast.error(response.message)
      }

      console.log("Server response:", result);
      // Reset form after submission
      setCourseData({
        className: "",
        teacherName: "",
        courseCode: "",
        isActive: false,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="text-white relative">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 w-4/5">
        <div className="flex flex-row justify-center gap-4">
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

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create A Class
        </button>
      </form>
      {res && (
        <h1 className={res.success ? " bg-green-500 rounded p-2 w-1/6 font-bold text-black" : "bg-red-500 rounded p-2 w-1/6 font-bold text-black"}>
          {res.message}
        </h1>
      )}


      <ToastContainer />
    </div>
  );
}

export default Create_class;
