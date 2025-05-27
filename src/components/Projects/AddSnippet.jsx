import { useEffect, useState } from "react";
import { fetchProjects,clearError } from "../../redux/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Navbar from "../Navbar";
import { fetchLanguages } from "../../redux/projectsSlice";
import { useNavigate } from "react-router";
import { addSnippet } from "../../redux/SnippetsSlice";
const AddSnippet = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { status, projects} = useSelector((state) => state.projects);
  const {loading,error} = useSelector(state=>state.snippets)
  const [snippetName, setSnippetName] = useState("");
  const [description, setDescription] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [lang, setlang] = useState(null);

  const [projectSelected, setProjectSelected] = useState(null);
  const [langSelected, setLangSelected] = useState(null);
  const [version, setVersion] = useState("V 1.0");
  const [projectName,setProjectName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      projectName,
      snippetName,
      description,
      projectSelected,
      langSelected,
      version,
    });
    try{dispatch(
      addSnippet({
        projectName,
        projectId: projectSelected,
        snippetName: snippetName,
        snippetVersion: version,
        description,
        snippetLanguage:langSelected,
        navigate
      })
    )}catch(e){console.log(e)}
    
  };
  const setLanguages = async () => {
    const mylang = await fetchLanguages();
    setlang(mylang);
    console.log('Languages',mylang);
  };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(clearError())
    setLanguages();
  }, []);
  useEffect(() => {
    setAllProjects((prev) => [projects]);
    console.log("My Projects", allProjects);
  }, [projects]);
  
  
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
                Select Project
              </label>
              <select
                className="w-full border p-2 rounded bg-amber-700"
                onChange={(e) => {
                  setProjectSelected(e.target.value)
                  setProjectName(projects?.filter((project)=>project.project_id === e.target.value)[0].project_name)
                }}
                required
                value={projectSelected}
              >
                <option value=" ">Select Project</option>
                {projects?.map((project, index) => {
                  return (
                    <option
                      className=""
                      key={index}
                      value={project?.project_id}
                    >
                      {project?.project_name}
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
                <option value=""></option>
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
            {error?.message.includes('unique_snippet_name_version') && <p className="text-red-500">Snippet already exists with same name and version</p>}
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

export default AddSnippet;
