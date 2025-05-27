import { useEffect, useState } from "react";
import { fetchProjects, clearError } from "../../redux/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { fetchLanguages } from "../../redux/projectsSlice";
import { useNavigate, useLocation } from "react-router";
import { updateSnippetDetails } from "../../redux/SnippetsSlice";

const EditSnippet = () => {
  const location = useLocation();
  const { snippet } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, projects } = useSelector((state) => state.projects);
  const { loading, error } = useSelector((state) => state.snippets);
  const [snippetName, setSnippetName] = useState(snippet.snippet_name);
  const [description, setDescription] = useState(snippet.description);
  const [lang, setlang] = useState(null);

  const [langSelected, setLangSelected] = useState(snippet.snippet_language);
  const [version, setVersion] = useState(snippet.snippet_version);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(langSelected, description, version, snippetName);
    dispatch(
      updateSnippetDetails({
        snippetId: snippet.snippet_id,
        snippetName,
        snippetVersion: version,
        snippetLanguage:langSelected,
        description,
        navigate
      })
    );
  };
  const setLanguages = async () => {
    const mylang = await fetchLanguages();
    setlang(mylang);
    console.log("Languages", mylang);
  };

  useEffect(() => {
    dispatch(clearError());
    setLanguages();
  }, []);

  if (loading) return <Loader></Loader>;
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add New Sniipet To Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium mb-1"
              >
                Snippet Name
              </label>
              <input
                type="text"
                id="projectName"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter snippet name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium mb-1"
                onChange={(e) => {
                  setLangSelected(e.target.value);
                }}
              >
                Select Snippet Language
              </label>
              <select
                name=""
                id=""
                className="w-full border p-2 rounded bg-amber-700"
                required
                value={langSelected}
                onChange={(e) => setLangSelected(e.target.value)}
              >
                <option value=" "></option>
                {lang?.map((l, index) => {
                  return (
                    <option className="" key={index} value={l?.language}>
                      {l?.language}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium mb-1"
              >
                Snippet Version
              </label>
              <input
                type="text"
                id="snippet_version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter snippet name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter snippet description"
                rows="4"
                required
              ></textarea>
            </div>
            {error?.message && <p>{error.message}</p>}
            {error?.message.includes("unique_snippet_name_version") && (
              <p className="text-red-500">
                Snippet already exists with same name and version
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSnippet;
