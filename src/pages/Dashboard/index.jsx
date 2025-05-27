import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router";
import ProjectCard from "../../components/Projects/ProjectCard";
import { fetchProjects ,deleteProject} from "../../redux/projectsSlice";
import { useState } from "react";
import Loader from "../../components/Loader";
import ConfirmPopUp from "../../components/ConfirmPopUp";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { projects,projectStatus } = useSelector((state) => state.projects);
  const [open,setOpen] = useState(false)
  const handleStart = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      console.log("Clicked");
      navigate("/newproject");
    }
  };
  const deleteFinal = async(projectId) => {
    setOpen(false)
    const resultAction =  dispatch(deleteProject({projectId}))
    if(deleteProject.fulfilled.match(resultAction)){
      dispatch(fetchProjects())
    }
  }

  if(projectStatus === 'loading') return <Loader></Loader>
  return (
    <div className="bg-gray-950 text-white min-h-[100vh]  ">
      <Navbar></Navbar>

      <div
        className={`text-center w-[100vw] h-[90vh] grid justify-center ${
          projects.length === 0 ? "block" : "hidden"
        }`}
      >
        <div className="text-lg font-light max-w-100 self-center">
          <p className="pb-5">
            You haven't created any project yet. Start your first project to
            organize your code snippets beautifully.
          </p>
          <button
            onClick={handleStart}
            className=" inline border-1 w-50 h-10 bg-pink-600 font-light text-lg rounded cursor-pointer"
          >
            <IoIosAdd className="inline" size={30} />
            New Project
          </button>
        </div>
      </div>
      <div className="header">
        <p className="font-semibold text-green-300 text-center p-3 text-3xl font-stretch-130%">ALL PROJECTS</p>
      </div>
      <div className={`flex p-2 ${projects ? "block" : "hidden"} flex flex-wrap justify-center`}>
        {projects.map((project, index) => {
          return (
            <div key={index} className="p-2">
              <ProjectCard
                title={project.project_name.toUpperCase()}
                description={project.description}
                projectId={project.project_id}
                setOpen={setOpen}
              ></ProjectCard>
      <ConfirmPopUp open={open} onCancel={()=>{setOpen(false)}} onConfirm={()=>deleteFinal(project.project_id)}/>

            </div>
          );
        })}
      </div>
      {/* <AddProject></AddProject> */}
    </div>
  );
}

export default Dashboard;
