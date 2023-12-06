import React, { useState } from "react";
import { Response } from "../../models/response.model";

const defaultImgState = {
  width: "400",
  height: "400",
  styles: "object-contain  transition duration-500",
};
export const Image = ({ img }: { img: Response }) => {
  const [imgConfig, setImgConfig] = useState(defaultImgState);
  const [showFullImage, setShowFullImage] = useState(false);
  const onImgClick = async () => {
    setShowFullImage(!showFullImage);
    setImgConfig(
      showFullImage
        ? defaultImgState
        : {
            width: "auto",
            height: "auto",
            styles:
              "absolute top-0  transition-all w-full h-full object-contain  delay-400 duration-500 ",
          }
    );

    //     await fetch("http://localhost:3000/download", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ url: img.url, id: img.id }),
    //     });
  };
  return (
    <img
      onClick={onImgClick}
      className={imgConfig.styles + " cursor-pointer"}
      src={img.url}
      width={imgConfig.width}
      height={imgConfig.height}
      alt=""
    />
  );
};
