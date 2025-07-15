"use client";

import DashNav from "@/app/components/DashNav/dashNav";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const Page = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            const baseURL = process.env.NEXT_PUBLIC_API_URL;

            try {
                const token = localStorage.getItem("accessToken");
                const res = await fetch(`${baseURL}/appointment`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                    cache: "no-store",
                });

                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

                const data = await res.json();
                setAppointments(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter((app) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            app.name.toLowerCase().includes(searchLower) ||
            app.phone.includes(searchTerm) ||
            app.status.toLowerCase().includes(searchLower) ||
            app.createdAt.toLowerCase().includes(searchLower) ||
            (app.service?.name || "").toLowerCase().includes(searchLower)
        );
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <aside className="w-64 fixed h-full bg-white shadow-lg">
                    <DashNav />
                </aside>
                {loading ? (
                    <div className="p-8 text-center w-full mx-auto">
                        Loading...
                    </div>
                ) : (
                    <main className="ml-64 p-8 w-full">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-8 flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        Appointments
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        Showing {filteredAppointments.length} of{" "}
                                        {appointments.length} appointments
                                    </p>
                                </div>
                                <div className="relative w-96">
                                    <input
                                        type="text"
                                        placeholder="Search appointments..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                {[
                                                    "Patient's Name",
                                                    "Phone",
                                                    "Status",
                                                    "Time",
                                                    "Service Name",
                                                    "Action",
                                                ].map((header) => (
                                                    <th
                                                        key={header}
                                                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredAppointments.map(
                                                (app, index) => (
                                                    <tr
                                                        key={index}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4 font-medium text-gray-900">
                                                            {app.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-700">
                                                            {app.phone}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    app.status ===
                                                                    "PENDING"
                                                                        ? "bg-yellow-100 text-yellow-800"
                                                                        : app.status ===
                                                                          "CONFIRMED"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : app.status ===
                                                                          "CANCELLED"
                                                                        ? "bg-green-100 text-red-800"
                                                                        : app.status ===
                                                                          "COMPLETED"
                                                                        ? "bg-green-100 text-blue-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                                }`}
                                                            >
                                                                {app.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-700">
                                                            {formatDate(
                                                                app.createdAt
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-700">
                                                            {app.service
                                                                ?.name || "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Link
                                                                href={`appointment/${app.id}`}
                                                                className="text-blue-600 hover:text-blue-900 font-medium"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {filteredAppointments.length === 0 && (
                                    <div className="p-12 text-center text-gray-500">
                                        No matching appointments found
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};

export default Page;
