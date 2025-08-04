// /* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const [show, setshow] = useState({ content: "" });
  const [data, setdata] = useState();

  const Inserdata = (e) => {
    const { name, value } = e.target;
    setshow({ ...show, [name]: value });
  };

  const postApi = async (e) => {
    e.preventDefault();
    const goodjob = await axios.post(
      "http://localhost:3000/postcreate",
      {
        content: show.content,
      },
      { withCredentials: true }
    );
    if (!goodjob) return console.log("Not done properly", goodjob);
  };
  useEffect(() => {
    const putData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sendpost");

        if (!response.data) return alert("There is no Data present.");
        setdata(response.data); // ✅ Only the actual data
      } catch (error) {
        console.error("why", error.message);
      }
    };
    putData();
  }, []);
  console.log(data);

  return (
    <>
      <div className="w-full min-h-screen p-[1rem] bg-zinc-700 ">
        <h1 className="font-bold text-white text-xl">
          Hello👋
          {data ? (
            <p className="text-white">{data.user.name}</p>
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </h1>
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
        {data ? (
          <div className="flex gap-10 flex-wrap">
            <div className="border text-white rounded p-[10px] mt-6 mb-6 max-w-[30rem] min-w-[30rem] min-h-[10rem] break-all text-pretty">
              <span className="text-white">
                {data ? (
                  <p className="text-white">@{data.user.username}</p>
                ) : (
                  <p className="text-white">Loading...</p>
                )}
              </span>

              {data?.user.post?.map((post) => post.content)}

              <div className="flex gap-5">
                <p className="hover:cursor-pointer">Like</p>
                <p className="text-gray-300 hover:cursor-pointer">Edit</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">No posts yet.</p>
        )}
      </div>
    </>
  );
};

export default Post;
