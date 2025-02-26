function AdminHome (){
    const dataFromLocalStorage = localStorage.getItem("userData");

    const userInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null


    return(
        <div>
            <h1 className="z-20 mt-10 bg-black text-cyan-400">Well come to Admin DashBoard</h1>
           
            <div>
                 <h1> Admin mrs {userInfo.name}</h1>
                 <h1> Admin  Email {userInfo.email}</h1>
                 <h1> Tu Admin Hai betichod :- {userInfo.role}</h1>
            </div>
        </div>
    )
}
export default AdminHome;