import SnippetCard from "../../components/Projects/SnippetCard";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
// import { fetchSnippetsByProjectId } from "../../utils/supabaseUtils/supabaseDB";
import { fetchSnippetsByProjectId } from "../../redux/SnippetsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Loader from "../../components/Loader";
import useProjects from "../../utils/supabaseUtils/useProjects";
import ConfirmPopUp from "../../components/ConfirmPopUp";
import { deleteSnippetBySnippetId } from "../../redux/SnippetsSlice";

function Snippets() {
  const { getProjectNameById } = useProjects();
  const location = useLocation();
  const { projectName } = location.state || {};
  const dispatch = useDispatch();
  const { id } = useParams();
  const { snippets: snippetInReduxState, loading } = useSelector(
    (state) => state.snippets
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [pName, setPName] = useState(null);

  useEffect(() => {
    // handleFetch();
    if (!projectName) {
      const name = getProjectNameById(id);
      console.log("P_name", name);
      setPName(name);
    }
    if (!snippetInReduxState[id]) {
      console.log("Snippets not found in redux so fetching");
      dispatch(fetchSnippetsByProjectId(id));
    }
  }, []);

  if (loading) return <Loader></Loader>;
  return (
    <div className="bg-gray-900 min-h-[100vh]">
      <div className="">
        <Navbar></Navbar>
      </div>
      <p className="text-center font-semibold text-2xl p-2 text-green-500 ">
        SNIPPETS OF {projectName || pName?.toUpperCase()}
      </p>
      <div className="p-2 flex wrap-normal flex-wrap justify-center">
        {snippetInReduxState[id]?.map((snippet, index) => {
          return (
            <div className="p-1 " key={index}>
              <SnippetCard
                setShowPopUp={setShowPopUp}
                snippet={snippet}
                snippetId={snippet.snippet_id}
                language={snippet.snippet_language}
                version={snippet.snippet_version}
                header={snippet.snippet_name}
                description={snippet.description}
              ></SnippetCard>
              ;
              <ConfirmPopUp
                open={showPopUp}
                onCancel={() => setShowPopUp(false)}
                onConfirm={() => {
                  setShowPopUp(false);
                  dispatch(deleteSnippetBySnippetId(snippet.snippet_id));
                }}
              ></ConfirmPopUp>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Snippets;
