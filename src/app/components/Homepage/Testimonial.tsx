import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonial = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseURL}/testimonial`, {
        cache: "no-store",
    });
    const data = await res.json();
    const testimonial = data.data;

    return (
        <div className="w-full container mx-auto py-12 px-4 md:px-8 lg:px-16 bg-base-100 text-base-content">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                    রোগীদের পর্যালোচনা
                </h2>
                <p className="text-gray-500 mt-2">
                    যারা সেবা নিয়েছেন তাদের কিছু মতামত
                </p>
            </div>

            {testimonial && testimonial.length > 0 ? (
                <div className="space-y-6">
                    {testimonial.map((t: any) => (
                        <div
                            key={t.id}
                            className="card bg-base-200 shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="card-body flex flex-col md:flex-row items-center gap-6">
                                {/* User Image */}
                                <div className=" w-[100px] h-[100px]">
                                    <Image
                                        src={t.image || "/default-user.jpg"}
                                        alt={`${t.name}'s photo`}
                                        width={100}
                                        height={100}
                                        className="w-full h-full rounded-full object-cover border-4"
                                    />
                                </div>

                                {/* Testimonial Info */}
                                <div className="text-center md:text-left w-full">
                                    <h2 className="text-xl font-semibold text-green-500">
                                        {t.name || "নাম পাওয়া যায়নি"}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {t.address || "ঠিকানা অনুপলব্ধ"}
                                    </p>
                                    <p className="text-sm mt-1 text-gray-600">
                                        সেবা: {t.serviceName || "N/A"}
                                    </p>
                                    <div className="flex justify-center md:justify-start my-2">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`text-yellow-400 ${
                                                        i < t.rating
                                                            ? "opacity-100"
                                                            : "opacity-30"
                                                    }`}
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-gray-700 text-sm mt-2 italic">
                                        “{t.comment || "মন্তব্য অনুপলব্ধ"}”
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {t.date
                                            ? new Date(
                                                  t.date
                                              ).toLocaleDateString("bn-BD", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "তারিখ নেই"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    কোনো পর্যালোচনা পাওয়া যায়নি...
                </div>
            )}
        </div>
    );
};

export default Testimonial;
