"use client";
import { useState, ChangeEvent, FormEvent } from "react";

/* ---------- types ---------- */

type AnswerType = "" | "TEXT" | "CHECKBOX" | "DROPDOWN";

interface Question {
    question: string;
    answerType: AnswerType;
    options: string[];
}

interface FormData {
    name: string;
    description: string;
    image: string;
    questions: Question[];
}

/* ---------- component ---------- */

const AdminForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        description: "",
        image: "",
        questions: [{ question: "", answerType: "", options: [""] }],
    });

    /* helper – change top‑level text fields */
    const handleRootChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /* helper – change a field inside one Question object */
    const handleQuestionChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index: number,
        field: keyof Question
    ) => {
        const value = e.target.value;
        setFormData((prev) => {
            const updated = [...prev.questions];
            const q = { ...updated[index] };

            if (field === "answerType") {
                q.answerType = value as AnswerType;
                // for TEXT answers we don’t need options
                if (value === "TEXT") q.options = [];
            } else if (field === "question") {
                q.question = value;
            }

            updated[index] = q;
            return { ...prev, questions: updated };
        });
    };

    /* helper – change one option value */
    const handleOptionChange = (
        e: ChangeEvent<HTMLInputElement>,
        qIndex: number,
        optIndex: number
    ) => {
        const value = e.target.value;
        setFormData((prev) => {
            const updated = [...prev.questions];
            const q = { ...updated[qIndex] };
            const opts = [...q.options];
            opts[optIndex] = value;
            q.options = opts;
            updated[qIndex] = q;
            return { ...prev, questions: updated };
        });
    };

    /* add a new empty question */
    const addQuestion = () =>
        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                { question: "", answerType: "", options: [""] },
            ],
        }));

    /* add an empty option to one question */
    const addOption = (qIndex: number) =>
        setFormData((prev) => {
            const updated = [...prev.questions];
            updated[qIndex] = {
                ...updated[qIndex],
                options: [...updated[qIndex].options, ""],
            };
            return { ...prev, questions: updated };
        });

    /* submit */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const baseURL = process.env.NEXT_PUBLIC_API_URL; // make sure this is set!

        try {
            const res = await fetch(`${baseURL}/services`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error(await res.text());
            alert("Data submitted successfully!");
            setFormData({
                name: "",
                description: "",
                image: "",
                questions: [{ question: "", answerType: "", options: [""] }],
            });
        } catch (err) {
            console.error(err);
            alert("Failed to submit.");
        }
    };

    /* ---------- render ---------- */

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Post Form</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* top‑level fields */}
                <label className="block">
                    <span className="font-semibold">Form Name</span>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleRootChange}
                        className="border p-2 w-full"
                    />
                </label>

                <label className="block">
                    <span className="font-semibold">Description</span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleRootChange}
                        className="border p-2 w-full"
                    />
                </label>

                <label className="block">
                    <span className="font-semibold">Image URL</span>
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleRootChange}
                        className="border p-2 w-full"
                    />
                </label>

                {/* questions */}
                <h2 className="font-bold">Questions</h2>
                {formData.questions.map((q, i) => (
                    <div key={i} className="space-y-2 border p-3 rounded">
                        <input
                            placeholder="Question text"
                            name="question"
                            value={q.question}
                            onChange={(e) =>
                                handleQuestionChange(e, i, "question")
                            }
                            className="border p-2 w-full"
                        />

                        <select
                            name="answerType"
                            value={q.answerType}
                            onChange={(e) =>
                                handleQuestionChange(e, i, "answerType")
                            }
                            className="border p-2 w-full"
                        >
                            <option value="">Select answer type</option>
                            <option value="TEXT">Text</option>
                            <option value="CHECKBOX">Checkbox</option>
                            <option value="DROPDOWN">Dropdown</option>
                        </select>

                        {q.answerType !== "TEXT" && (
                            <>
                                <h3 className="font-semibold">Options</h3>
                                {q.options.map((opt, j) => (
                                    <div key={j} className="flex gap-2">
                                        <input
                                            value={opt}
                                            onChange={(e) =>
                                                handleOptionChange(e, i, j)
                                            }
                                            className="border p-2 flex-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => addOption(i)}
                                            className="bg-blue-500 text-white px-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                ))}
                            </>
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
