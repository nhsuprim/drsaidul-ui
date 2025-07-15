import DashNav from "@/app/components/DashNav/dashNav";
import React from "react";

const page = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <aside className="w-64 fixed h-full bg-white shadow-lg">
                    <DashNav />
                </aside>

                <div className="ml-64 p-8 w-full">
                    <h1 className="text-5xl">Welcome to Dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default page;
