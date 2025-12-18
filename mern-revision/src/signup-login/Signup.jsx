import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";

import SignupTeacher from "./signup-teacher";
import SignupStudent from "./singup-student";

function Signup() {
  const [teacher, setTeacher] = useState(true);
  const { loading } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Toggle Switch */}
      <div className="flex border rounded-full overflow-hidden bg-white/10 shadow-lg">
        {/* Teacher Button */}
        <button
          onClick={() => setTeacher(true)}
          className={`px-6 py-2 text-sm font-semibold transition-all duration-300
          ${teacher && "bg-gradient-to-r from-green-400 to-lime-500 text-black"}`}
        >
          Teacher
        </button>

        {/* Student Button */}
        <button
          onClick={() => setTeacher(false)}
          className={`px-6 py-2 text-sm font-semibold transition-all duration-300
          ${!teacher && "bg-gradient-to-r from-green-400 to-lime-500 text-black"}`}
        >
          Student
        </button>
      </div>

      {/* Conditional Component */}
      <div className="w-full">
        {teacher ? <SignupTeacher /> : <SignupStudent />}
      </div>
    </div>
  );
}

export default Signup;
