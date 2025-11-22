import React from "react";
import bannerImg from "../../assets/banner.png";
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md: justify-end">
        <img src={bannerImg} alt="banner" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          Mới phát hành trong tuần này
        </h1>
        <p className="mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque natus
          culpa nihil modi doloremque sunt nisi nobis vitae eum accusamus, in
          magni recusandae, beatae doloribus, officia sed libero eaque saepe!
        </p>
        <button className="btn-primary">Theo dõi</button>
      </div>
    </div>
  );
};

export default Banner;
