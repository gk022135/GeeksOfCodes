import { useSelector, useDispatch } from "react-redux"


function Todo_Page() {

    const incompleteTask = useSelector(state => state.todo.tasks)
    const completeTask = useSelector(state => state.todo.completedTasks)

    const total = incompleteTask.length + completeTask.length;
    console.log("total", total)

    const percentage = (completeTask / (incompleteTask + completeTask)) * 100;




    return (
        <div className="flex flex-col bg-gradient-to-bl from-teal-400 to-orange-500 p-2 border-2 rounded-2xl relative m-1">
            <h1>Your Task Lists</h1>
            <div className="flex flex-row"> 
                <h1 className="text-sm">0%</h1>
                <h1 className="text-sm ml-[170px]">100%</h1>
            </div>
            <div className="flex flex-row border-2 justify-between items-center relative w-9/10">
                <div className="border-2 border-b-emerald-700 bg-red-500"
                    style={{ width: `${percentage}%`, height: "10px", minWidth: "5px" }}>
                </div>
            </div>
            <a href="/todo-home" className="w-3/5 border-2 m-2 p-1 rounded-2xl bg-gradient-to-tr from-pink-700 to-green-700">Check Your Task </a>



        </div>
    )
}

export default Todo_Page