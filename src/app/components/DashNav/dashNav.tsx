import Link from "next/link";
import React from "react";

const DashNav = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <p className="text-2xl font-bold mb-6 text-gray-800">Dashboard</p>
            <div className="flex flex-col gap-6">
                <Link
                    href="/admin/dashboard/services"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
                >
                    Services
                </Link>
                <Link
                    href="/admin/dashboard/appointment"
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
                >
                    Appointment
                </Link>
                <Link
                    href="/admin/dashboard/reviews"
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition"
                >
                    Reviews
                </Link>
            </div>
        </div>
    );
};

export default DashNav;
