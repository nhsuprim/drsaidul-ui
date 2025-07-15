import Image from "next/image";
import Banner from "./components/Homepage/Banner";
import Testimonial from "./components/Homepage/Testimonial";
import FQuestion from "./components/Homepage/FQuestion";
import Services from "./components/services/services";

export default function Home() {
    return (
        <div className="">
            <Banner />
            <Services />
            <FQuestion />
            <Testimonial />
        </div>
    );
}
