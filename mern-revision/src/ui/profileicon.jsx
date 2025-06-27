import React from 'react';
import { UserPen } from 'lucide-react';

const ProfileIcon = ({ imageUrl, profileUrl, alt = "Profile" }) => {
    const handleClick = () => {
        window.location.href = "/User-profile";
    };

    return (
        <img className='border-2 border-amber-300'
            src={imageUrl}
            alt={alt}
            style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
            onClick={handleClick}
        />
    );
};

export default ProfileIcon;