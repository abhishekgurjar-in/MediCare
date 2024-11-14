import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with a real image URL
    name: "John Doe",
    review: "The medical services here are fantastic! I feel well cared for and treated with the utmost respect.",
    rating: 5,
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/2.jpg", // Replace with a real image URL
    name: "Jane Smith",
    review: "I had a great experience, and the staff is very attentive. I highly recommend their services.",
    rating: 4,
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/3.jpg", // Replace with a real image URL
    name: "Jimmy Trump",
    review: "Excellent treatment! The doctors and nurses are very professional and kind.",
    rating: 5,
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/4.jpg", // Replace with a real image URL
    name: "Alice Johnson",
    review: "I’m very pleased with the care I received. The staff is friendly and knowledgeable.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>

                  <div className="flex flex-center gap-[2px]">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <HiStar key={index} className="text-yellowColor w-[18px] h-5" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {testimonial.review}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
