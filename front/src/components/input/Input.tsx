import React, { useEffect, useState } from "react";
import { Response } from "../../models/response.model";
import { Image } from "../gallery/Image";

export const Input = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [imgUrls, setImgUrls] = useState<Response[]>([]);
  const [limit, setLimit] = useState(50);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSiteUrl(target.value);
  };

  useEffect(() => {}, []);

  const getImages = async () => {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: siteUrl, limit }),
    });

    const data = await response.json();
    setImgUrls(data);
  };

  const onSubmitHandler = () => {
    getImages();
  };

  const onLoadMoreHandler = () => {
    setLimit((prev) => (prev += 25));
    getImages();
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="flex justify-center">
        <input
          type="text"
          value={siteUrl}
          onChange={onChangeHandler}
          className="w-[90vw] border-2 border-gray-300 rounded-md p-2"
        />
        <button
          onClick={onSubmitHandler}
          className="bg-violet-800 text-white border-2 border-violet-500 rounded-md p-2 ml-2"
        >
          Submit
        </button>
      </section>
      {/* CORS */}
      <div className="flex flex-wrap h-[70vh] gap-2 overflow-auto justify-center">
        {imgUrls.map((img) => (
          <Image img={img} key={img.id} />
        ))}
      </div>
      <button onClick={onLoadMoreHandler}>Load More</button>
    </div>
  );
};

export default Input;
