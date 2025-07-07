import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white text-gray-800 px-6 py-12 flex flex-col items-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-lg mb-6">
          We are a passionate team dedicated to building user-friendly and
          efficient web solutions. Our goal is to deliver high-quality products
          that help people solve real-world problems.
        </p>
        <p className="text-md mb-6">
          Founded in 2023, our company has worked with clients around the world
          to design and develop modern web applications. We believe in clean
          design, simple user experience, and performance.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-500">Our Mission</h2>
            <p className="text-sm mt-2">
              To empower users through innovative digital solutions.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-500">Our Vision</h2>
            <p className="text-sm mt-2">
              A world where technology improves everyday life for everyone.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-500">Our Values</h2>
            <p className="text-sm mt-2">
              Honesty, creativity, teamwork, and continuous learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
