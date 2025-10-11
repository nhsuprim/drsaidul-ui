"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Question = {
    question: string;
    answerType: "TEXT" | "CHECKBOX" | "DROPDOWN";
    options: string[];
};

type FormDataType = {
    name: string;
    description: string;
    amount: string;
    amountMonthly: string; // keep as string for controlled input
    questions: Question[];
};

export default function ServiceForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        description: "",
        amount: "",
        amountMonthly: "",
        questions: [],
    });

    const router = useRouter();

    const addQuestion = () => {
        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    question: "",
                    answerType: "TEXT",
                    options: [],
                },
            ],
        }));
    };

    const handleQuestionChange = (
        index: number,
        field: "question" | "answerType",
        value: string
    ) => {
        setFormData((prev) => {
            const updated = [...prev.questions];
            const q = { ...updated[index] };

            if (field === "answerType") {
                q.answerType = value as Question["answerType"];
                if (value === "TEXT") q.options = [];
            } else {
                q.question = value;
            }

            updated[index] = q;
            return { ...prev, questions: updated };
        });
    };

    const addOption = (questionIndex: number) => {
        setFormData((prev) => {
            const updated = [...prev.questions];
            updated[questionIndex] = {
                ...updated[questionIndex],
                options: [...updated[questionIndex].options, ""],
            };
            return { ...prev, questions: updated };
        });
    };

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number,
        value: string
    ) => {
        setFormData((prev) => {
            const updated = [...prev.questions];
            const q = { ...updated[questionIndex] };
            q.options[optionIndex] = value;
            updated[questionIndex] = q;
            return { ...prev, questions: updated };
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        form.append(
            "data",
            JSON.stringify({
                ...formData,
            })
        );
        // console.log(formData);
        files.forEach((file) => form.append("file", file));

        const token = localStorage.getItem("accessToken");
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await axios.post(`${baseURL}/services`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token}`,
                },
            });

            if (response.data.success) {
                toast.success("Service successfully created");
                console.log("Service created:", response.data);
                router.push("/admin/dashboard/services");
                setFormData({
                    name: "",
                    description: "",
                    amount: "",
                    amountMonthly: "",
                    questions: [],
                });
                setFiles([]);
            } else {
                throw new Error("Failed to create service");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating service");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Create New Service
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Info */}
                <div className="space-y-4 border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Service Information
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Service Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Service Amount
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={formData.amount}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    amount: e.target.value, // keep as string
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Service Amount for 3 Months
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={formData.amountMonthly}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    amountMonthly: e.target.value, // keep as string
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            required
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block mb-2 text-gray-700 font-semibold">
                            Attach Files (Optional):
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Questions Section
                        </h2>
                    </div>

                    {formData.questions.map((question, qIndex) => (
                        <div
                            key={qIndex}
                            className="border-l-4 border-blue-500 pl-4 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    value={question.question}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            qIndex,
                                            "question",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Answer Type
                                </label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    value={question.answerType}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            qIndex,
                                            "answerType",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="TEXT">Text</option>
                                    <option value="CHECKBOX">Checkbox</option>
                                    <option value="DROPDOWN">Dropdown</option>
                                </select>
                            </div>

                            {(question.answerType === "CHECKBOX" ||
                                question.answerType === "DROPDOWN") && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            Options
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => addOption(qIndex)}
                                            className="text-blue-600 hover:text-blue-700 text-sm"
                                        >
                                            Add Option
                                        </button>
                                    </div>

                                    {question.options.map((option, oIndex) => (
                                        <div
                                            key={oIndex}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                value={option}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        qIndex,
                                                        oIndex,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 float-right transition-colors"
                    >
                        Add Question
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                    Create Service
                </button>
            </form>
        </div>
    );
}
