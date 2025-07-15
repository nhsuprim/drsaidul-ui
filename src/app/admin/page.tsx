"use client";
import { useState } from "react";

const AdminForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        questions: [{ question: "", answerType: "", options: [""] }],
    });

    const handleChange = (e, index, field) => {
        const { name, value } = e.target;
        if (field === "questions") {
            const updatedQuestions = [...formData.questions];
            updatedQuestions[index][name] = value;
            setFormData({ ...formData, questions: updatedQuestions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const { value } = e.target;
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                { question: "", answerType: "", options: [""] },
            ],
        });
    };

    const addOption = (questionIndex) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options.push("");
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${baseURL}/services`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log(formData);
                alert("Data submitted successfully!");
                console.log(response);
                setFormData({
                    name: "",
                    description: "",
                    image: "",
                    questions: [
                        { question: "", answerType: "", options: [""] },
                    ],
                });
                // console.log(formData);
            } else {
                alert("Failed to submit data.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Post Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="font-semibold">Form Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <h2 className="font-bold">Questions</h2>
                    {formData.questions.map((q, index) => (
                        <div key={index} className="space-y-2">
                            <label className="font-semibold">Question</label>
                            <input
                                type="text"
                                name="question"
                                value={q.question}
                                onChange={(e) =>
                                    handleChange(e, index, "questions")
                                }
                                className="border p-2 w-full"
                            />
                            <label className="font-semibold">Answer Type</label>
                            <select
                                name="answerType"
                                value={q.answerType}
                                onChange={(e) =>
                                    handleChange(e, index, "questions")
                                }
                                className="border p-2 w-full"
                            >
                                <option value="">Select</option>
                                <option value="TEXT">Text</option>
                                <option value="CHECKBOX">Checkbox</option>
                                <option value="DROPDOWN">Dropdown</option>
                            </select>
                            {q.answerType !== "TEXT" && (
                                <div>
                                    <h3 className="font-semibold">Options</h3>
                                    {q.options.map((option, optIndex) => (
                                        <div
                                            key={optIndex}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        e,
                                                        index,
                                                        optIndex
                                                    )
                                                }
                                                className="border p-2 w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => addOption(index)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Question
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AdminForm;
