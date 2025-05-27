import Loader from "../../components/Loader";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProject } from "../../redux/projectsSlice";
import Navbar from "../Navbar";
const EditProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectError, projectStatus } = useSelector(
    (state) => state.projects
  );
  const location = useLocation();
  const { project, description: desc, id } = location.state || {};
  const [projectName, setProjectName] = useState(project);
  const [description, setDescription] = useState(desc);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateProject({ projectId: id, projectName, description, navigate })
    );
  };
  useEffect(() => {
    if (!project || !desc || !id) navigate("/dashboard");
  }, []);
  if (projectStatus === "loading") return <Loader></Loader>;
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add New Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium mb-1"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
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
                placeholder="Enter project description"
                rows="4"
                required
              ></textarea>
            </div>
            {projectError?.message}
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

export default EditProject;
