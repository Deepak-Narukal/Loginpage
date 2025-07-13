/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const [show, setshow] = useState({ content: "" });

  const Inserdata = (e) => {
    const { name, value } = e.target;
    setshow({ ...show, [name]: value });
    console.log(show);
  };
  const postApi = async () => {
    const goodjob = await axios.post("http://localhost:3000/postcreate", {
      content: show.content,
    });
    if (!goodjob) return console.log("Not done properly", goodjob);
  };
  useEffect(() => {
    const posts = axios
      .get("http://localhost:3000/sendpost")
      .then(() => console.log(posts))
      .catch((err) => console.error(err));
    if (!posts) return alert("there is no Data present.");
  }, []);

  return (
    <>
      <div className="w-full min-h-screen p-[1rem] bg-zinc-700 ">
        <h1 className="font-bold text-white text-xl">Hello👋 Anmol</h1>
        <p className="text-gray-500 font-bold text-lg">
          You can create a new post.:
        </p>
        <form onSubmit={postApi}>
          {" "}
          <textarea
            name="content"
            id="text"
            onChange={Inserdata}
            className="border rounded w-[30rem] h-[10rem] p-2 text-white"
            placeholder="What's on your mind ?"
          ></textarea>
          <input
            type="submit"
            value="Create Post"
            className="border-blue-500 rounded pr-[8px] pl-[8px] bg-blue-500 text-white mt-[2px] block hover:cursor-pointer"
          />
        </form>
        <div className="flex gap-10 flex-wrap">
          <div className="border text-white rounded p-[10px] mt-6 mb-6 max-w-[30rem] min-h-[10rem] break-all text-pretty">
            <p className="text-white">@Anmol</p>
            <h3 className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              sit accusantium perferendis quibusdam error porro, autem quidem
              voluptatem modi eos laborum a voluptas quisquam iusto sed mollitia
              molestias ratione. Quasi?
            </h3>
            <div className="flex gap-5">
              <p className="hover:cursor-pointer">Like</p>
              <p className="text-gray-300 hover:cursor-pointer">Edit</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
