import React, { useState } from 'react';
import { UserPen, ChevronDown } from 'lucide-react';
import toggle from 'daisyui/components/toggle';

const ProfileIcon = ({ imageUrl, profileUrl, alt = "Profile" }) => {
    const [toggle, setToggle] = useState(false)
    const handleClick = () => {
        window.location.href = "/User-profile";
    };

    return (
        <div className="flex items-center space-x-2 relative group">
            <img
                className="border-2 border-amber-300"
                src={imageUrl}
                alt={alt}
                style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
                onClick={handleClick}
            />
            <button onClick={(e) => { setToggle(!toggle) }}><ChevronDown color='white' className="w-4 h-4" /></button>

            {/* Dropdown Menu */}
            {toggle && (
                <ul className="absolute top-12 right-0 bg-base-100 border border-gray-400 text-white rounded shadow-md p-2 space-y-2 z-10 w-40">
                    <li className='border-b-1 border-gray-400'>
                        <a href="/User-profile" className="flex items-center space-x-2 hover:text-amber-600">
                            <UserPen size={16} />
                            <span>Student</span>
                        </a>
                    </li>
                    <li className='border-b-1 border-gray-400'>
                        <a href="/admin-dashboard" className="flex items-center space-x-2 hover:text-amber-600">
                            <UserPen size={16} />
                            <span>Teacher Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="/administrato" className="flex items-center space-x-2 hover:text-amber-600">
                            <UserPen size={16} />
                            <span>Admin</span>
                        </a>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileIcon;
