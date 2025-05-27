import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const SnippetCard = ({ header, description, version, language,snippetId,snippet,setShowPopUp }) => {
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState(false);

    const [showCopy,setShowCopy] = useState(false)

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setTimeout(()=>{
            setShowOptions(false);
        },2000)
    };

    const handleEdit = () => {
        console.log('Edit clicked');
        navigate('/editsnippet',{state:{snippet:snippet}})
    };

    const handleDelete = () => {
        console.log('Delete clicked');
        setShowPopUp(true)
    };

    const handleEditCode = () => {
        console.log('Edit Code clicked');
        navigate('/addcode/snippet/'+snippetId,{state:{
            snippet:snippet
        }})
    };

    const handleCopyCode = () => {
        console.log('Copy Code clicked');
        setShowCopy(true)
        window.navigator.clipboard.writeText(snippet.snippet_code)
        console.log("Coppied Code")
        setTimeout(()=>setShowCopy(false),1000)
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-80 relative">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-500">{header.toUpperCase()}</h3>
                <div
                    className="relative cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaEllipsisV />
                    {showOptions && (
                        <div className="absolute top-6 right-0 bg-gray-700 border border-gray-600 rounded-md shadow-md z-10">
                            <div
                                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                onClick={handleEdit}
                            >
                                Edit
                            </div>
                            <div
                                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                onClick={handleDelete}
                            >
                                Delete
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 ">
                <p>
                    <strong>Description:</strong> {description}
                </p>
                <p>
                    <strong>Version:</strong> {version}
                </p>
                <p>
                    <strong>Language:</strong> {language}
                </p>
            </div>
            <div className="h-px bg-gray-600 my-4"></div>
            <div className="flex justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleEditCode}
                >
                    Edit Code
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleCopyCode}
                >
                    <p className={showCopy?'text-green-300':''}>{showCopy?'Copied':'Copy Code'}</p>
                </button>
            </div>
        </div>
    );
};

export default SnippetCard;