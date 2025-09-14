"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Option {
    id: string;
    label: string;
}

interface Question {
    id: string;
    question: string;
    answerType: "CHECKBOX" | "TEXT" | "DROPDOWN";
    option?: Option[];
}

interface Service {
    id: string;
    name: string;
    description: string;
    amount: string;
    amountMonthly: string;
    image: string;
    questions: Question[];
}

interface Answer {
    questionText: string;
    answer: string;
}

const Page = ({ params }: { params: { id: string } }) => {
    const [service, setService] = useState<Service | null>(null);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [address, setAddress] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [showUserInfo, setShowUserInfo] = useState(false);

    const router = useRouter();

    // Fetch service data on component mount
    useEffect(() => {
        const getData = async () => {
            const baseURL = process.env.NEXT_PUBLIC_API_URL;
            try {
                const response = await fetch(
                    `${baseURL}/services/${params.id}`
                );
                const json = await response.json();
                setService(json.data);
            } catch (error) {
                console.error("Error fetching service:", error);
            }
        };
        getData();
    }, [params.id]);

    // Handlers for updating answers
    const handleOptionChange = (
        questionId: string,
        optionId: string,
        questionText: string
    ) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { questionText, answer: optionId },
        }));
    };

    const handleTextChange = (
        questionId: string,
        value: string,
        questionText: string
    ) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { questionText, answer: value },
        }));
    };

    const handleDropdownChange = (
        questionId: string,
        value: string,
        questionText: string
    ) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { questionText, answer: value },
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
        }
    };

    // Submission handler
    const handleSubmit = async () => {
        // Input validation
        if (!name.trim() || !phone.trim()) {
            toast.error("আপনার নাম ও ফোন নম্বর আবশ্যক!");
            return;
        }

        const unansweredQuestions = service?.questions.filter(
            (q) => !answers[q.id] || !answers[q.id].answer
        );

        if (unansweredQuestions && unansweredQuestions.length > 0) {
            toast.error("অনুগ্রহ করে সব প্রশ্নের উত্তর দিন!");
            return;
        }

        const formattedQuestions = Object.values(answers).map((answerObj) => {
            const question = service?.questions.find(
                (q) => q.question === answerObj.questionText
            );

            let finalAnswer = answerObj.answer;
            if (
                question?.option?.length &&
                (question.answerType === "CHECKBOX" ||
                    question.answerType === "DROPDOWN")
            ) {
                const matchedOption = question.option.find(
                    (opt) => opt.id === answerObj.answer
                );
                finalAnswer = matchedOption
                    ? matchedOption.label
                    : answerObj.answer;
            }

            return {
                question: answerObj.questionText,
                answer: finalAnswer,
            };
        });

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                name,
                phone,
                address,
                note,
                status: "PENDING",
                serviceId: service?.id,
                questions: formattedQuestions,
            })
        );

        files.forEach((file) => {
            formData.append("files", file);
        });

        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await axios.post(
                `${baseURL}/appointment/create-appointment`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                toast.success("অ্যাপয়েন্টমেন্ট সফলভাবে নেওয়া হয়েছে!");
                router.push("/");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(
                "সাবমিশনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
            );
        }
    };

    if (!service) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <span className="loading loading-ring loading-xl"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Service Header */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-3xl">
                    <div className="flex lg:flex-row items-center gap-8">
                        <div className="relative w-20 h-20 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg ring-8 ring-white">
                            <img
                                src={service.image || ""}
                                alt={service.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        <div className="text-center lg:text-left flex-1">
                            <h1 className=" md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                {service.name}
                            </h1>
                            <p className="hidden md:block text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        <h2 className=" md:text-4xl font-bold text-justify text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">
                            আপনার চিকিৎসার পর্যালোচনার জন্য অনুগ্রহ করে নিচের
                            প্রশ্নগুলোর উত্তর দিন
                        </h2>
                        <div className="space-y-8">
                            {service.questions.map((question) => (
                                <div
                                    key={question.id}
                                    className="bg-gray-50 rounded-2xl p-6 transition-all duration-200 hover:bg-white hover:shadow-lg"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        {question.question}
                                    </h3>
                                    <div className="space-y-4">
                                        {question.answerType === "CHECKBOX" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {question.option?.map(
                                                    (option) => (
                                                        <label
                                                            key={option.id}
                                                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                                                answers[
                                                                    question.id
                                                                ]?.answer ===
                                                                option.id
                                                                    ? "bg-blue-50 border-blue-500 shadow-md"
                                                                    : "bg-white border-gray-200 hover:border-blue-400"
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                required
                                                                className="h-5 w-5 text-blue-600 rounded-md focus:ring-blue-500 border-gray-300"
                                                                checked={
                                                                    answers[
                                                                        question
                                                                            .id
                                                                    ]
                                                                        ?.answer ===
                                                                    option.id
                                                                }
                                                                onChange={() =>
                                                                    handleOptionChange(
                                                                        question.id,
                                                                        option.id,
                                                                        question.question
                                                                    )
                                                                }
                                                            />
                                                            <span className="text-gray-700 font-medium">
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {question.answerType === "TEXT" && (
                                            <input
                                                type="text"
                                                placeholder="এখানে লিখুন..."
                                                required
                                                className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                                                onChange={(e) =>
                                                    handleTextChange(
                                                        question.id,
                                                        e.target.value,
                                                        question.question
                                                    )
                                                }
                                            />
                                        )}

                                        {question.answerType === "DROPDOWN" && (
                                            <div className="relative">
                                                <select
                                                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white pr-10 text-gray-800"
                                                    onChange={(e) =>
                                                        handleDropdownChange(
                                                            question.id,
                                                            e.target.value,
                                                            question.question
                                                        )
                                                    }
                                                    value={
                                                        answers[question.id]
                                                            ?.answer || ""
                                                    }
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        একটি অপশন বাছাই করুন
                                                    </option>
                                                    {question.option?.map(
                                                        (option) => (
                                                            <option
                                                                key={option.id}
                                                                value={
                                                                    option.id
                                                                }
                                                                className="p-2"
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg
                                                        className="fill-current h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center italic text-gray-600 space-y-4">
                        <p>
                            “ধন্যবাদ আপনার তথ্যগুলো শেয়ার করার জন্য। আপনার যে
                            সমস্যাটা হচ্ছে, এটা অনেকের মধ্যেই দেখা যায়—চিন্তার
                            কিছু নেই। হোমিওপ্যাথিক চিকিৎসার সবচেয়ে বড় সুবিধা
                            হলো এতে কোনো ধরনের পার্শ্বপ্রতিক্রিয়া নেই, এ বিষয়ে
                            আপনি সম্পূর্ণ নিশ্চিন্ত থাকতে পারেন। যদিও হোমিও ঔষধ
                            ধীরে ধীরে কাজ করে, তবে এটি সমস্যার মূল কারণ দূর করে
                            স্থায়ী সমাধান দেয়, ইনশাআল্লাহ।”
                        </p>
                        <p>
                            "আমাদের ৩ মাসের হোমিও কোর্স গ্রহণ করলে আপনার সমস্যার
                            সমাধান হবে, ইনশাআল্লাহ। সাধারণত{" "}
                            <span className="font-semibold text-red-500">
                                ১০-১৫
                            </span>{" "}
                            দিনের মধ্যে ভালো পরিবর্তন বুঝতে পারবেন এবং সম্পূর্ণ
                            কোর্স শেষে ইনশাআল্লাহ স্থায়ী সমাধান পাওয়া যাবে।
                            আপনার সঙ্গে ফোন বা ভিডিও কলের মাধ্যমে কথা বলে সঠিক
                            সেবা দেওয়া হবে। আপনি কি এখন চিকিৎসা শুরু করতে
                            আগ্রহী?
                        </p>
                    </div>

                    {/* Proceed Button */}
                    {!showUserInfo && (
                        <div className="text-center pt-8">
                            <button
                                onClick={() => setShowUserInfo(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                ডাক্তারের পরামর্শের জন্য অনুগ্রহ করে আপনার তথ্য
                                প্রদান করুন →
                            </button>
                        </div>
                    )}
                </div>

                {/* User Information Form */}
                {showUserInfo && (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 animate-fade-in-down">
                        <div className=" italic text-gray-600 space-y-2 text-justify">
                            <p>
                                "আপনার সমস্যার স্থায়ী সমাধানের জন্য আমাদের
                                হোমিও ৩ মাসের পূর্ণ কোর্স খুব কার্যকর হবে
                                ইনশাআল্লাহ।
                                <span className="font-semibold text-gray-800">
                                    {" "}
                                    * প্রতি মাসের ঔষধের মূল্য {
                                        service.amount
                                    }{" "}
                                    টাকা, তবে একসাথে ৩ মাসের কোর্স নিলে হবে
                                    মাত্র {service.amountMonthly} টাকা।
                                </span>{" "}
                                ঔষধ নিতে আগ্রহী হলে আপনার নাম, ঠিকানা ও মোবাইল
                                নম্বর দিন? ডা. সাইদুল ইসলাম আপনাকে ফোন বা ভিডিও
                                কলের মাধ্যমে বিস্তারিত জানিয়ে, সঠিক পরামর্শ ও
                                ঔষধ পাঠাবেন। ইনশাআল্লাহ স্থায়ী সমাধান পাবেন।"
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-l-4 border-green-600 pl-4">
                            আপনার তথ্য দিন
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    আপনার নাম
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    ফোন নাম্বার{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    ঠিকানা
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                আপনার সমস্যাটি বিস্তারিতভাবে জানান
                            </label>
                            <textarea
                                className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 transition-all"
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                ছবিযুক্ত করুন (চাইলে নাও দিতে পারেন)
                            </label>
                            <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-8 transition-colors hover:border-blue-400">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <p className="text-sm text-gray-500 text-center md:text-left">
                                    <span className="text-red-500">*</span>{" "}
                                    Required fields
                                    <br />
                                    Your information is securely protected.
                                </p>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 w-full md:w-auto"
                                >
                                    কনফার্ম করুন
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
