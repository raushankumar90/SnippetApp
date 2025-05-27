import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="w-16 h-16 bg-blue-500 animate-bounce rounded-full"></div>
        </div>
    );
};

export default Loader;
