

function UserHome (){

    const dataFromLocalStorage = localStorage.getItem("userData");

    const userInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null


    return(
        <div>
            <h1 className="z-20 mt-10 bg-black text-cyan-400">Well come to User DashBoard</h1>
           
            <div>
                <h1>hsdklfjlf</h1>
                 <h1> helllo mrs {userInfo.name}</h1>
                 <h1> helllo mrs {userInfo.email}</h1>
                 <h1> ti Student Hai betichod :- {userInfo.role}</h1>
            </div>
        </div>
    )
}
export default UserHome;