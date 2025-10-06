import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                {/* --- Doctor Info --- */}
                <aside className="flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-xl font-bold text-white">
                        ডা. সাইদুল ইসলাম
                    </p>
                    <p className="text-green-400 font-medium">
                        হোমিওপ্যাথি কনসালটেন্ট
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Providing reliable healthcare for over 10 years
                    </p>
                </aside>

                {/* --- Social Links --- */}
                <nav className="flex flex-col items-center md:items-start">
                    <h6 className="text-lg font-semibold text-white mb-3">
                        Follow Us
                    </h6>
                    <div className="flex gap-4">
                        {/* Twitter */}
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="hover:text-green-400 transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="#"
                            aria-label="YouTube"
                            className="hover:text-green-400 transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="hover:text-green-400 transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>

            {/* --- Bottom Copyright --- */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} ডা. সাইদুল ইসলাম — All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
