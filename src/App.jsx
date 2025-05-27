import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import supabase from "./supabase/supabasse";
import { useState, useRef, useEffect } from "react";
import Loader from "./components/Loader";
import { BrowserRouter, Routes, Route } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { checkSession,setUser,clearState } from "./redux/AuthSlice";
import ProtectedPage from "./components/ProtectedPage";
import Landing from "./pages/Landing/index";
import AddProject from './components/Projects/AddProject'
import AddSnippet from "./components/Projects/AddSnippet";
import Snippets from "./pages/Snippets";
import AddSnippetInProject from "./pages/AddSnippet";
import EditOrAddCode from "./pages/EditOrAddCode";
import EditProject from "./components/Projects/EditProject";
import { fetchProjects } from "./redux/projectsSlice";
import Test from "./components/Test";
import EditSnippet from "./pages/EditSnippet";
function App() {
  const dispatch = useDispatch()
  const {user,isAuthenticated,error,loading} = useSelector(state=>state.auth)
  
  useEffect(() => {
    console.log(user, isAuthenticated , error , loading)
    dispatch(checkSession())
    const { data: listener } = supabase.auth.onAuthStateChange((e, session) => {
      if(session?.user){
        console.log('My session',session.user)
        dispatch(setUser(session?.user))
      }else{
        dispatch(clearState())
        console.log("no session",e,session)
      }
    });
    
    return ()=>{listener.subscription.unsubscribe()}
  }, [dispatch]);  

  //fetch projects when signin
  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchProjects());
    }
  }, [isAuthenticated]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedPage>
          <Dashboard />
        </ProtectedPage>} />
        <Route path="/newproject" element={<ProtectedPage>
          <AddProject />
        </ProtectedPage>} />
        <Route path="/addsnippet" element={<ProtectedPage>
          <AddSnippet />
        </ProtectedPage>} />
        <Route path="/snippets/:id" element={<ProtectedPage>
          <Snippets />
        </ProtectedPage>} />
        <Route path="/addsnippet/:id" element={<ProtectedPage>
          <AddSnippetInProject />
        </ProtectedPage>} />
        <Route path="/addcode/snippet/:id" element={<ProtectedPage>
          <EditOrAddCode />
        </ProtectedPage>} />
        <Route path="/editproject" element={<ProtectedPage>
          <EditProject />
        </ProtectedPage>} />
        <Route path="/editsnippet" element={<ProtectedPage>
          <EditSnippet />
        </ProtectedPage>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
