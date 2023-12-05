import React, { useState } from "react";

interface Response {
  url: string;
  id: number;
}
export const Input = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [imgUrls, setImgUrls] = useState<Response[]>([]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSiteUrl(target.value);
  };

  const onSubmitHandler = async () => {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: siteUrl }),
    });

    const data = await response.json();
    setImgUrls(data);
  };
  return (
    <div>
      <input type="text" value={siteUrl} onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>Submit</button>
      {/* CORS */}
      {/* <img
        src="https://waifubitches.com/images/a/604/-203367964/280282413/457255412.jpg"
        alt=""
      /> */}
      {imgUrls.map((img) => (
        <img src={img.url} key={img.id} alt="" />
      ))}
    </div>
  );
};

export default Input;
