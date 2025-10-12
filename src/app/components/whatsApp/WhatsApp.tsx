import Link from "next/link";
import React from "react";

import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
    return (
        <div>
            <Link
                href="https://wa.me/+8801732295556"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-[9999]"
            >
                <FaWhatsapp size={30} />
            </Link>
        </div>
    );
};

export default WhatsApp;
