"use client";

import DashNav from "@/app/components/DashNav/dashNav";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Page = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await fetch(`${baseURL}/services`, {
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch services. Status: ${res.status}`
                );
            }
            const data = await res.json();
            setServices(data.data);
        } catch (err: any) {
            setError(
                err.message || "Something went wrong while fetching services."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDeleteService = async (id: string) => {
        const token = localStorage.getItem("accessToken");
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await fetch(`${baseURL}/services/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(
                    `Failed to delete service. Status: ${res.status}`
                );
            }

            toast.success("Service deleted successfully");
            // Refresh the list
            fetchServices();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete service");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <aside className="w-64 fixed h-full bg-white shadow-lg">
                    <DashNav />
                </aside>
                <main className="ml-64 p-8 w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Services
                        </h2>
                        <Link
                            href="/admin/dashboard/services/add"
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded shadow"
                        >
                            + Add New Service
                        </Link>
                    </div>

                    {loading ? (
                        <p>Loading services...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg shadow border bg-white">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="py-3 px-4 text-left">
                                            #
                                        </th>
                                        <th className="py-3 px-4 text-left">
                                            Name
                                        </th>
                                        <th className="py-3 px-4 text-left">
                                            Description
                                        </th>
                                        <th className="py-3 px-4 text-left">
                                            Image
                                        </th>
                                        <th className="py-3 px-4 text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(
                                        (service: any, index: number) => (
                                            <tr
                                                key={service.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="py-2 px-4">
                                                    {index + 1}
                                                </td>
                                                <td className="py-2 px-4">
                                                    {service.name}
                                                </td>
                                                <td className="py-2 px-4">
                                                    {service.description}
                                                </td>
                                                <td className="py-2 px-4">
                                                    <Image
                                                        src={service.image}
                                                        alt={service.name}
                                                        height={64}
                                                        width={64}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteService(
                                                                service.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                                    >
                                                        <MdDelete className="text-lg" />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Page;
