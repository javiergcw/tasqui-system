'use client';
import React, { useState } from 'react';
import { TestimonialCard } from '../TestimonialCard';
import { colors, colorClasses } from '@/lib/colors';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      clientName: "Adam Smith",
      clientRole: "Web Developer"
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      clientName: "John Doe",
      clientRole: "Graphics Designer"
    },
    {
      quote: "Exceptional service and support throughout the entire process. The team was professional, responsive, and delivered exactly what we needed. Highly recommend their services to anyone looking for quality work.",
      clientName: "Sarah Johnson",
      clientRole: "Marketing Manager"
    },
    {
      quote: "Outstanding results that exceeded our expectations. The attention to detail and creative approach made all the difference. We couldn't be happier with the final outcome.",
      clientName: "Michael Brown",
      clientRole: "CEO"
    }
  ];

  const nextTestimonial = () => {
    if (isTransitioning) return;
    console.log('Next clicked, currentIndex:', currentIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= testimonials.length - 1 ? 0 : nextIndex;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    console.log('Prev clicked, currentIndex:', currentIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const prevIndexCalc = prevIndex - 1;
        return prevIndexCalc < 0 ? testimonials.length - 2 : prevIndexCalc;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 2);

  return (
    <section className="bg-white py-12 md:py-20">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            What Client&apos;s Say About Us
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-16 md:mb-32 items-stretch h-auto md:h-[320px]">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 transform -translate-x-8' : 'opacity-100 transform translate-x-0'
              }`}
            >
              <TestimonialCard
                quote={testimonial.quote}
                clientName={testimonial.clientName}
                clientRole={testimonial.clientRole}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-4 md:gap-6 mt-8 md:mt-20">
          <button
            className={`w-10 h-10 md:w-12 md:h-12 ${colorClasses.background.red50} rounded-full flex items-center justify-center hover:${colorClasses.background.red100} transition-colors duration-200`}
            style={{ color: colors.mainRed }}
            onClick={prevTestimonial}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            className={`w-10 h-10 md:w-12 md:h-12 ${colorClasses.background.red50} rounded-full flex items-center justify-center hover:${colorClasses.background.red100} transition-colors duration-200`}
            style={{ color: colors.mainRed }}
            onClick={nextTestimonial}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
