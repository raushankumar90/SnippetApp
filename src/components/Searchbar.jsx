import { TbSend2 } from "react-icons/tb";
import { fetchGeminiResponse, setData } from "../redux/GeminiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { FaCopy } from "react-icons/fa6";

function Searchbox({ language, setCode }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const { loading, data } = useSelector((state) => state.gemini.gemini);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchGeminiResponse({
        prompt: search,
        language: language || "javascript",
      })
    );
    setSearch("");
  };
  return (
    <div className="p-2 text-center">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ask ai to write code snippet"
        type="text"
        className="p-2 w-[60vw] inline-block outline-none border-1 rounded"
      />
      <button onClick={handleSearch} className="p-3 rounded bg-blue-500 m-2 inline-block">
        <TbSend2 />
      </button>
      <div className={loading ? "visible" : "hidden"}>Generating Code</div>
      <div className={`${data ? "visible" : "hidden"}`}>
        <Editor
          language="javascript"
          value={data}
          width={"100%"}
          height={300}
        ></Editor>
        <div className={`p-2 ${data ? "visible" : "hidden"}`}>
          <button
            onClick={() => window.navigator.clipboard.writeText(data)}
            className="p-2 bg-amber-700 cursor-pointer"
          >
            {" "}
            <FaCopy size={15} />
          </button>
          <button
            onClick={() => {
              setCode(data);
              dispatch(setData());
            }}
            className="p-2 m-1 bg-green-400"
          >
            Accept
          </button>
          <button
            onClick={() => dispatch(setData())}
            className="p-2 m-1 bg-red-500"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchbox;
