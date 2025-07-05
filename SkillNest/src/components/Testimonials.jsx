import React from 'react';

const Testimonials = ({ darkMode }) => {
     const data = [
          {
               name: "Jane Doe",
               role: "Software Engineer",
               image: "https://randomuser.me/api/portraits/women/44.jpg",
               rating: 5,
               text: "SkillNest helped me land my dream job within a week! It’s simple and effective."
          },
          {
               name: "Emeka Okoro",
               role: "HR Manager",
               image: "https://randomuser.me/api/portraits/men/34.jpg",
               rating: 4,
               text: "A must-have for recruiters. The talent pool is top-notch and easy to manage."
          },
          {
               name: "Chinaza Obi",
               role: "Data Analyst",
               image: "https://randomuser.me/api/portraits/women/65.jpg",
               rating: 5,
               text: "I love the mobile-friendly design. Applying for jobs has never been easier."
          },
     ];

     return (
         <section
             id="testimonials"
             className={`py-20 px-4 transition-colors duration-300 ${
                 darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
             }`}
         >
              <div className="max-w-6xl mx-auto text-center mb-14">
                   <h2 className="text-3xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                        What People Are Saying
                   </h2>
                   <p className="text-base text-gray-600 dark:text-gray-300">
                        Trusted by thousands of job seekers and employers
                   </p>
              </div>

              <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center items-stretch">
                   {data.map((testimonial, index) => (
                       <div
                           key={index}
                           className={`w-full max-w-sm p-6 rounded-xl shadow-md transition-all duration-300 ${
                               darkMode
                                   ? "bg-gray-800 border border-gray-700"
                                   : "bg-white border border-gray-200"
                           }`}
                       >
                            {/* Rating */}
                            <div className="text-yellow-400 text-lg mb-2">
                                 {"★".repeat(testimonial.rating)}
                                 {"☆".repeat(5 - testimonial.rating)}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-sm mb-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                                 {testimonial.text}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                 <img
                                     src={testimonial.image}
                                     alt={testimonial.name}
                                     className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                                 />
                                 <div>
                                      <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                           {testimonial.name}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                           {testimonial.role}
                                      </p>
                                 </div>
                            </div>
                       </div>
                   ))}
              </div>
         </section>
     );
};

export default Testimonials;
