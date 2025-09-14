// import Image from "next/image";
// import React from "react";
// import DrPic from "@/assets/DrSaidulIslam.jpeg";
// import { FaBuilding, FaStethoscope } from "react-icons/fa";
// import { HiOutlineBuildingLibrary } from "react-icons/hi2";

// const Banner = () => {
//     return (
//         <div className=" bg-gradient-to-br from-[#0F3D6A] via-[#1A5B8A] to-[#2B879E] relative overflow-hidden rounded-sm">
//             <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                 <div className="absolute top-20 right-40 w-64 h-64 bg-[#4CAF50] rounded-full mix-blend-screen blur-3xl opacity-30"></div>
//                 <div className="absolute bottom-20 left-40 w-72 h-72 bg-[#2196F3] rounded-full mix-blend-screen blur-3xl opacity-30"></div>
//             </div>

//             <div className="container mx-auto px-4 py-16 lg:py-24">
//                 <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
//                     {/* Doctor's Image */}
//                     <div className="w-full lg:w-1/2 flex justify-center">
//                         <div className="relative group">
//                             <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-teal-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
//                             <Image
//                                 src={DrPic}
//                                 width={600}
//                                 height={800}
//                                 alt="ডা. সাইদুল ইসলাম এর ছবি"
//                                 className="rounded-2xl shadow-2xl object-cover border-4 border-white/10 hover:border-white/20 transition-all duration-300"
//                             />
//                         </div>
//                     </div>

//                     {/* Doctor's Information */}
//                     <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
//                         <div className="space-y-4">
//                             <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-amber-200 to-teal-100 bg-clip-text text-transparent mb-4 py-2">
//                                 ডা. সাইদুল ইসলাম
//                             </h1>

//                             <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-2 rounded-full">
//                                 <FaStethoscope className="text-teal-300 text-xl" />
//                                 <p className="text-lg font-semibold text-teal-100">
//                                     ডি এইচ এম এস
//                                 </p>
//                             </div>

//                             <p className="text-lg text-white/80">
//                                 বাংলাদেশ হোমিও মেডিকেল কলেজ এন্ড হাসপাতাল
//                             </p>
//                             <p className="text-sm text-white/60">
//                                 গভ রেজিঃ নং-৩২০৫৬
//                             </p>
//                         </div>

//                         {/* Contact Cards */}
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-teal-300/30 transition-all">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <HiOutlineBuildingLibrary className="text-2xl text-teal-300" />
//                                     <h3 className="text-xl font-semibold text-white">
//                                         চেম্বার
//                                     </h3>
//                                 </div>
//                                 <p className="text-sm text-white/80 leading-relaxed">
//                                     সোহান হোমিও ফার্মেসি, বাংলাদেশ হোমিও মেডিকেল
//                                     কলেজ এন্ড হাসপাতাল এর পাশে,
//                                     <br />
//                                     ওয়ারী, জয়কালী মন্দির, ঢাকা।
//                                 </p>
//                             </div>

//                             <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-amber-300/30 transition-all">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <FaBuilding className="text-2xl text-amber-300" />
//                                     <h3 className="text-xl font-semibold text-white">
//                                         অফিস
//                                     </h3>
//                                 </div>
//                                 <p className="text-sm text-white/80 leading-relaxed">
//                                     হাউস ২১/A/B, মেরিগোল্ড টাওয়ার, (লিফট ১০)
//                                     <br />
//                                     মীরহাজিরবাগ, যাত্রাবাড়ী, ঢাকা
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;

import Image from "next/image";
import React from "react";
import DrPic from "@/assets/DrSaidulIslam.jpeg";
import { FaBuilding, FaStethoscope } from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

const Banner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f7fafc] via-[#f0fdfa] to-[#e0f2fe] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-1/3 right-0 w-64 h-64 bg-[#99f6e4] rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#bae6fd] rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
                    {/* Doctor's Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-100 to-emerald-100 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                            <Image
                                src={DrPic}
                                width={600}
                                height={800}
                                alt="ডা. সাইদুল ইসলাম এর ছবি"
                                className="rounded-2xl shadow-lg object-cover border-8 border-white hover:border-cyan-50 transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Doctor's Information */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#0f172a] mb-4">
                                ডা. সাইদুল ইসলাম
                                <span className="block mt-2 text-2xl lg:text-3xl font-semibold text-cyan-600">
                                    হোমিওপ্যাথি কনসালটেন্ট
                                </span>
                            </h1>

                            <div className="inline-flex items-center gap-2 bg-cyan-50 px-6 py-2 rounded-full border border-cyan-100">
                                <FaStethoscope className="text-cyan-600 text-xl" />
                                <p className="text-lg font-semibold text-cyan-800">
                                    ডি এইচ এম এস (বাংলাদেশ হোমিও মেডিকেল কলেজ)
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-lg text-slate-600">
                                    গভঃ রেজিঃ নং-৩২০৫৬
                                </p>
                                <p className="text-sm text-slate-500">
                                    ১0+ বছর অভিজ্ঞতা | ১০,০০০+ সফল কেস
                                </p>
                            </div>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-cyan-200 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <HiOutlineBuildingLibrary className="text-2xl text-cyan-600" />
                                    <h3 className="text-xl font-semibold text-slate-800">
                                        চেম্বার
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    সোহান হোমিও ফার্মেসি, বাংলাদেশ হোমিও মেডিকেল
                                    কলেজ এন্ড হাসপাতাল এর পাশে,
                                    <br />
                                    ওয়ারী, জয়কালী মন্দির, ঢাকা।
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <FaBuilding className="text-2xl text-amber-600" />
                                    <h3 className="text-xl font-semibold text-slate-800">
                                        অফিস
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    হাউস ২১/A/B, মেরিগোল্ড টাওয়ার, (লিফট ১০)
                                    <br />
                                    মীরহাজিরবাগ, যাত্রাবাড়ী, ঢাকা
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
