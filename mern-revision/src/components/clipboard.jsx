import React, { useState } from 'react';
import { Copy, CheckCheck } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ObjectDisplayCopy({ImageUrl}) {
    // Replace with your actual object
    const [isShow, setShow] = useState(false);
    const myObject = "nothing here try again"

    const handleCopy = () => {
        const objectString = JSON.stringify(ImageUrl ? ImageUrl : myObject, null, 2);

        navigator.clipboard.writeText(objectString).then(() => {
            toast.success('Copied to clipboard!');
            setShow(true);
            console.log(isShow, "hi");

            // Hide after 2 seconds
            setTimeout(() => {
                setShow(false);
                console.log("hide triggered");
            }, 2000);
        }).catch(() => {
            toast.error('Failed to copy');
        });
    };


    return (
        <div className="w-full max-w-4xl m-5 p-4 bg-black rounded-lg shadow-md overflow-auto border-2 border-gray-300">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">Your Image Url is below Copy the link and use it</h1>
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleCopy}
                    className="p-2 rounded hover:bg-gray-800 text-white"
                >
                    {isShow ? (<CheckCheck size={20} color='green' />) : (<Copy size={20} />)}
                </button>
            </div>

            <pre className="text-sm sm:text-base text-gray-100 font-mono whitespace-pre-wrap">
                {JSON.stringify(ImageUrl ? ImageUrl : myObject, null, 2)}
            </pre>

            <ToastContainer  theme ='dark' />
        </div>

    );
}