import { useDispatch } from "react-redux";
import { setSnippets } from "../redux/SnippetsSlice";
function Test() {
  const dispatch = useDispatch();
  const test = () => {
    dispatch
  };
  return (
    <>
      <div className=" w-full flex justify-center">
        <button onClick={test} className="text-center border p-2">
          Click To Test
        </button>
      </div>
    </>
  );
}

export default Test;
