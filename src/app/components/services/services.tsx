import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Services = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const res = await fetch(`${baseURL}/services`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Optional: if you want fresh data every time
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const response = await res.json();
        const services = response.data;
        // console.log(services);

        return (
            <div className="w-full container mx-auto mt-14">
                <h1 className="text-emerald-600 font-semibold text-center sm:text-2xl md:text-4xl pb-8  ">
                    আমাদের সেবা সমুহ
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                    {services.map((service: any) => (
                        <Link
                            href={`/services/${service.id}`}
                            key={service.id}
                            className=" p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className="text-center">
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={service.image || ""}
                                        alt={service.name}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 py-4">
                                        {service.name}
                                    </h2>
                                    <div className="  flex justify-center gap-2">
                                        <p className="text-blue-600">
                                            বিস্তারিত জানতে ক্লিক করুন
                                        </p>
                                        <span>
                                            <FaArrowRight />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">
                    Failed to load services. Please try again later.
                </div>
            </div>
        );
    }
};

export default Services;
