'use client'
import Features from "@/components/features/features";
import TestimonialCarousel from "@/components/testimonial/testimonial";
import { GetStarted, TryNow } from "@/components/getStarted/getStarted";
import { testimonials } from "@/utils/testimonials";

export default function Home() {
  return (
    <div className="w-full">
      <GetStarted />
      <Features />
      <TestimonialCarousel testimonials={testimonials} />
      <TryNow />
    </div>
  );
};
