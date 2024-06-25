import { useState } from "react";
import { Testimonial } from "@/utils/testimonials";

interface TestimonialProps {
    testimonials: Testimonial[]
}

const TestimonialCarousel = ({ testimonials }: TestimonialProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="carousel bg-gray-200 p-4">
            <div className="flex flex-col items-center rounded-lg p-6">
                <div className="quote text-xl mb-4">{testimonials[currentSlide].quote}</div>
                <div className="author text-gray-600">{testimonials[currentSlide].author}</div>
                <div className="role text-gray-400">{testimonials[currentSlide].role}</div>
            </div>
            <div className="controls flex justify-center mt-4">
                <button
                    className="prev bg-gray-300 shadow-gray-500 shadow-md hover:bg-gray-400 rounded-lg px-4 py-2 mr-2"
                    onClick={prevSlide}
                >
                    Prev
                </button>
                <button
                    className="next bg-gray-300 shadow-gray-500 shadow-md hover:bg-gray-400 rounded-lg px-4 py-2 ml-2"
                    onClick={nextSlide}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TestimonialCarousel;