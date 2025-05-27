import { useEffect, useRef, useState } from "react";
import { useParams ,useLocation} from "react-router";
import Editor from "@monaco-editor/react";
import Navbar from "../../components/Navbar";
import supabase from "../../supabase/supabasse";
// import { updateSnippetCode } from "../../utils/supabaseUtils/supabaseDB";
import { updateSnippetCode } from "../../redux/SnippetsSlice";
import { setSnippets } from "../../redux/SnippetsSlice";
import { useDispatch } from "react-redux";
import SnippetHeader from "../../components/SnippetHeader";
import Searchbox from "../../components/Searchbar";

const EditOrAddCode = () => {
  
  const dispatch = useDispatch()
  const { id } = useParams();
  const location = useLocation()
  const {snippet} = location.state || {}
  const [code, setCode] = useState(snippet.snippet_code);
  const timeOutRef = useRef(null);
  const handleSnippetChange = async (value) => {
    // dispatch(setSnippets({projectId:snippet.project_id,snippetId:snippet.snippet_id,code:value}))
    dispatch(updateSnippetCode({snippetId:id,snippetCode:value}))
  };

  
  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      if (code) handleSnippetChange(code);
    }, 5000); // 5 seconds after typing stops

    return () => clearTimeout(timeOutRef.current);
  }, [code]);
  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="p-5">
        <h1 className="mb-5 font-semibold text-2xl text-center text-amber-300">
          Edit Your Snippet
        </h1>
        <div className="mb-4 bg-gray-800 p-4 rounded-lg">
          <p className="text-lg mb-2 italic">
            <strong className="text-amber-300">Project </strong>:{" "}
            {snippet.project_name.toUpperCase()}
          </p>
          <p className="text-lg mb-2 italic">
            <strong className="text-amber-300">Snippet Name </strong>:{" "}
            {snippet.snippet_name.toUpperCase()}
          </p>
          <p className="text-base italic mb-1">
            <strong className="text-amber-300">Version</strong> :{" "}
            {snippet.snippet_version}
          </p>
          <p className="text-base italic">
            <strong className="text-amber-300">Language</strong> :{" "}
            {snippet.snippet_language}
          </p>
        </div>
        <Searchbox setCode={setCode} language={snippet.snippet_language.toLowerCase()}></Searchbox>
        <SnippetHeader snippetCode={code} language={snippet.snippet_language?.toLowerCase()} version={snippet.snippet_version}></SnippetHeader>

        <Editor
          height="500px"
          defaultLanguage={snippet.snippet_language}
          defaultValue={snippet.snippet_code}
          theme="vs-dark"
          onChange={(value) => setCode(value)}
          value={code}
        />
      </div>
    </div>
  );
};

export default EditOrAddCode;
