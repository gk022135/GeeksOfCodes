import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deletetask } from "../redux/slice/todoSlice";
import AddTimer from "./AddTimer";
import StartTimer from "./StartTimer";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';

function TodoHome() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [todolist, setTodolist] = useState({
        task: "",
    });

    const [percentages, setPercentages] = useState(0);


    const taskList = useSelector(state => state.todo.tasks);
    const completedTasks = useSelector(state => state.todo.completedTasks);


    const dispatch = useDispatch();

    const handleTask = (e) => {
        setTodolist({
            ...todolist, [e.target.name]: e.target.value
        });
    };

    
    const addHandler = () => {
        if (todolist) {
            dispatch(addTask(todolist));
            console.log("okk", todolist);
            setTodolist({ task: "" });
        } else {
            console.log("Task cannot be empty");
        }
    };
    const removeHandler = (index) => {
        const percentage = percentages[index] || 0;

        console.log("Removing task at index:", index, "with percentage:", percentage);
        if (percentage > 0 && percentage <= 100) {
            dispatch(deletetask({ index, percentage }));
            console.log("Deletion initiated");
        }


    };
    const percentHandler = (index, e) => {
        setPercentages(prev => ({ ...prev, [index]: e.target.value }));
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center text-white bg-black h-screen">




            <h1 className="h-10 bg-black content-center text-blue-300 text-3xl font-bold border-b-2  border-spacing-3">Make Your Daily Task Here</h1>

            <label className="flex flex-col m-2 p-2 border rounded-xl content-center gap-3 hover:text-yellow-200 pl-3 md:w-[600px] md:p-4">

                Make task here:
                <input
                    className="border-red-100 h-16 content-center rounded-lg pl-3 text-white bg-white/10"
                    type="text"
                    placeholder="Add task"
                    name="task"
                    value={todolist.task}
                    onChange={handleTask}
                />
                <button className="bg-gradient-to-tr from-red-600  h-10 pl-4 pr-4 text-cyan-300 rounded-sm hover:bg-black" onClick={addHandler}>Add</button>
            </label>
            <h1 className=" flex  border-b-8 border-red-500 mt-2 md:w-[600px] text-2xl text-emerald-400 justify-center">Your current tasks</h1>
            {taskList.length > 0 ? (
                    taskList.map((task, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 min-h-20 border m-2 p-3 content-center place-content-between items-center rounded-xl justify-between md:w-[600px] bg-black/50 shadow-lg bg-opacity-10"
                    >
                        <h1 className="break-words overflow-x-hidden w-full text-lg">{index + 1}. {task.task}</h1>
                        <div className="flex flex-row gap-3 items-center justify-between w-full">
                            <label className="flex items-center gap-2">
                                <input
                                    className="rounded-xl p-1 pl-3 w-20 bg-opacity-40 border border-gray-300"
                                    type="number"
                                    name={`percentage-${index}`}
                                    onChange={(e) => percentHandler(index, e)}
                                    value={percentages[index] || ''}
                                />
                            </label>
                            <button
                                className="h-8 px-4 rounded-xl bg-blue-600 text-white text-sm hover:bg-green-600"
                                onClick={() => removeHandler(index)}
                            >
                                % Done
                            </button>
                            <AddTimer />
                        </div>
                    </div>
                )) ): "null"}

            <br />
            <div
                className="flex  border-b-8 border-red-500 mt-2 md:w-[600px] text-2xl text-emerald-400 justify-center"
            >Completed tasks:</div>
            {!completedTasks.lenght > 0 ? (completedTasks
                .map((item, index) => (
                    <div
                        className="flex flex-row gap-3 h-20 border m-2 content-center place-content-between items-center pl-2 rounded-xl justify-between md:w-[600px]"
                        key={index}>

                        <div>
                            <h1
                                className="ml-2"
                            >{index + 1}. {item.task} - {item.percentage}% complete</h1>
                           
                            <div className="border border-black rounded-xl h-3 relative">
                                <div
                                    className="ml-2 h-2 bg-green-600 rounded items-center justify-center border relative"
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>



                        </div>
                    </div>
                )) ): ""}


        </div>
    );
}

export default TodoHome;
