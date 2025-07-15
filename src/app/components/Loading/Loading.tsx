import React from "react";

const Loading = () => {
    return (
        <div className="min-h-screen bg-orange-50 p-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-orange-600">Loading...</span>
        </div>
    );
};

export default Loading;
