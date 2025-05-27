import React, { useState } from "react";
import {
  FiMoreHorizontal,
  FiEdit,
  FiTrash,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import { setLoading, deleteProject,fetchProjects } from "../../redux/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loader from "../Loader";
import supabase from "../../supabase/supabasse";

const ProjectCard = ({ title, description, projectId,setOpen }) => {
  const navigate = useNavigate();
  const { projectStatus } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const handleDelete = async() => {
    setOpen(true)
  }
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="bg-gray-800 text-white shadow-[0_0_5px_2px_#eab308] rounded-lg p-6 w-80 relative transition-transform transform hover:scale-101">
      {/* Card Header */}
      <div className="flex justify-between items-center relative">
        <h3 className="text-xl font-bold tracking-wide">{title.toUpperCase()}</h3>
        <div className="relative group">
          <button className="text-gray-400 hover:text-gray-200 focus:outline-none">
            <FiMoreHorizontal size={24} className="transform rotate-90" />
          </button>
          <div className="absolute top-0 right-8 bg-gray-700 text-white shadow-md rounded-md p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="flex items-center text-sm text-gray-300 hover:text-white w-full px-2 py-1"
              onClick={() =>
                navigate("/editproject", {
                  state: {
                    project: title,
                    description: description,
                    id: projectId,
                  },
                })
              }
            >
              <FiEdit className="mr-2" />
              Edit
            </button>
            <button
              className="flex items-center text-sm text-gray-300 hover:text-white w-full px-2 py-1"
              onClick={handleDelete}
            >
              <FiTrash className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <p className="text-gray-400 mt-4 text-sm leading-relaxed">
        {description}
      </p>

      {/* Card Footer */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700  shadow-blue-500/50"
          onClick={() => navigate("/addsnippet/" + projectId)}
        >
          <FiPlus className="mr-2" />
          Snippet
        </button>
        <button
          className="flex items-center bg-gray-600 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-500"
          // onClick={() => navigate(`/snippets/` + projectId)}
          onClick={() => navigate(`/snippets/` + projectId ,{state:{projectName:title}})}
        >
          <FiEye className="mr-2" />
          View
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;