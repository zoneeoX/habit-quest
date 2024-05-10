import React from "react";
import { BsLaptopFill } from "react-icons/bs";
import CardPicture from "../assets/Card.png";
import CardPictureSecond from "../assets/CardSecondary.png";

const Card = () => {
  return (
    <div className="absolute right-0 top-10 bg-white w-fit p-4 rounded-xl">
      <span className="flex flex-row items-center gap-2 font-poppins">
        Coding{" "}
        <i>
          <BsLaptopFill />
        </i>{" "}
        * 2 People
      </span>
      <section>
        <img src={CardPicture} className="z-10" />
        <img src={CardPictureSecond} className="absolute" />
      </section>
    </div>
  );
};

export default Card;
