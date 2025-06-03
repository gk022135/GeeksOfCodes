import ProfileLeft from "../test/profile_left";
import RightPart from "../test/RightPart";



function UserProfile({ props }) {
    console.log("naaam", props)


    return (
        <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-10 lg:px-16 py-6">
            {/* Left (Profile) */}
            <div className="w-full lg:w-1/4 flex-shrink-0 border border-gray-600 rounded-xl p-4 bg-base-100 shadow-sm">
                <ProfileLeft />
            </div>

            {/* Right (Charts) */}
            <div className="w-full lg:w-3/4 border border-gray-300 rounded-xl p-4 bg-base-100 shadow-sm">
                <RightPart />
            </div>
        </div>


    )
}
export default UserProfile;