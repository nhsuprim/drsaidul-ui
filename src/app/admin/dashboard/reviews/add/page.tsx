"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ServiceForm() {
    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        comment: "",
        serviceName: "",
        rating: 0,
        date: "",
        address: "",
    });

    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number(value) : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        const form = new FormData();
        form.append("data", JSON.stringify(formData));
        if (image) form.append("file", image);

        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await axios.post(`${baseURL}/testimonial`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token}`,
                },
            });
            console.log("Response:", response.data);
            toast.success("Review added successfully");
            router.push("/admin/dashboard/reviews");
        } catch (err: any) {
            toast.error("Failed to add review");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Create Service</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Comment", name: "comment", type: "textarea" },
                    {
                        label: "Service Name",
                        name: "serviceName",
                        type: "text",
                    },
                    { label: "Rating", name: "rating", type: "number" },
                    { label: "Date", name: "date", type: "text" },
                    { label: "Address", name: "address", type: "text" },
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>
                        {field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                required
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <input
                                name={field.name}
                                type={field.type}
                                required
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        )}
                    </div>
                ))}

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
