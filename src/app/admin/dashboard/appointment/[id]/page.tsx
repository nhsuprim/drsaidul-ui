"use client";

import DashNav from "@/app/components/DashNav/dashNav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const statusColors: Record<string, string> = {
    PENDING: "bg-orange-100 text-orange-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
    COMPLETED: "bg-green-100 text-green-800",
};

const statusOptions = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

const Page = ({ params }: { params: { id: string } }) => {
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            const baseURL = process.env.NEXT_PUBLIC_API_URL;
            try {
                const token = localStorage.getItem("accessToken");
                const res = await fetch(`${baseURL}/appointment/${params.id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                    cache: "no-store",
                });

                if (!res.ok)
                    throw new Error(
                        `Failed to fetch appointment. Status: ${res.status}`
                    );
                const data = await res.json();
                setAppointment(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [params.id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleStatusChange = async (newStatus: string, id: string) => {
        try {
            // Update local state (optional, optimistic update)
            setAppointment((prev: any) => ({
                ...prev,
                status: newStatus,
            }));

            const token = localStorage.getItem("accessToken");

            const baseURL = process.env.NEXT_PUBLIC_API_URL;
            `${baseURL}/services`;

            // Send PATCH request to backend
            const response = await axios.patch(
                `${baseURL}/appointment/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            toast.success(`Appointment successfully ${newStatus}`);
        } catch (error) {
            toast.error("Appointment failed to update");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <aside className="w-64 fixed h-full bg-white shadow-lg">
                    <DashNav />
                </aside>

                <main className="ml-64 p-8 w-full">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Appointment Details
                            </h1>

                            {appointment?.status && (
                                <select
                                    value={appointment.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            e.target.value,
                                            appointment.id
                                        )
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium appearance-none border-none focus:outline-none ${
                                        statusColors[appointment.status]
                                    }`}
                                >
                                    {statusOptions.map((status) => (
                                        <option
                                            key={status}
                                            value={status}
                                            className="text-black"
                                        >
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {loading && (
                            <p className="text-center text-gray-500">
                                Loading appointment details...
                            </p>
                        )}
                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        {appointment && (
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Profile Section */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                {appointment.name}
                                            </h2>
                                            <p className="text-gray-600">
                                                {appointment.service?.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
                                            Contact Information
                                        </h3>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Phone
                                                </dt>
                                                <dd className="font-medium">
                                                    {appointment.phone}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Email
                                                </dt>
                                                <dd className="font-medium">
                                                    {appointment.email}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Address
                                                </dt>
                                                <dd className="font-medium">
                                                    {appointment.address}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
                                            Appointment Details
                                        </h3>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Service
                                                </dt>
                                                <dd className="font-medium">
                                                    {appointment.service?.name}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Created At
                                                </dt>
                                                <dd className="font-medium">
                                                    {formatDate(
                                                        appointment.createdAt
                                                    )}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Last Updated
                                                </dt>
                                                <dd className="font-medium">
                                                    {formatDate(
                                                        appointment.updatedAt
                                                    )}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>

                                {/* Form Responses */}
                                <div className="p-6 bg-gray-50">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
                                        Form Responses
                                    </h3>
                                    <div className="space-y-4">
                                        {appointment.form.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="p-4 bg-white rounded-lg shadow-sm"
                                            >
                                                <p className="text-sm font-medium text-gray-700 mb-1">
                                                    {item.question}
                                                </p>
                                                <p className="text-gray-900">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Service Details */}
                                <div className="p-6 border-t border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
                                        Service Information
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={appointment.service.image}
                                            alt="Service"
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {appointment.service.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {
                                                    appointment.service
                                                        .description
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Page;
