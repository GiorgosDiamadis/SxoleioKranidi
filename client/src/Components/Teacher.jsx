import React from "react";

export default function Teacher({ name, specialty, gender }) {
  return (
    <div
      data-aos={"zoom-in"}
      className="container mx-auto max-w-xs rounded-lg overflow-hidden my-2 bg-white"
    >
      <div className="relative mb-6">
        <img
          className="w-full"
          src={`${gender === "m" ? "/male.png" : "/female.png"} `}
          alt="Profile picture"
        />
        <div className="text-center absolute w-full">
          <h1 className="text-black tracking-wide uppercase text-lg font-bold">
            {name}
          </h1>
          <p className="text-gray-400 text-sm">{specialty}</p>
        </div>
      </div>
    </div>
  );
}
