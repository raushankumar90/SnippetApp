import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase/supabasse";

// Async thunk to fetch projects from Supabase
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) rejectWithValue(error);
    return data;
  }
);

export const fetchLanguages = async () => {
  try {
    const { data, error } = await supabase
      .from("project_languages")
      .select("*");
    if (error) console.log(error);
    console.log("Lang", data);
    return data;
  } catch (e) {
    console.log(e);
  }
}; // new a different slice

// Async thunk to add a project to Supabase
export const addProject = createAsyncThunk(
  "projects/addProject",
  async ({ projectName, description }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("projects")
      .insert([{ project_name: projectName, description: description }])
      .select();
    if (error) rejectWithValue(error);
    return data[0];
  }
);

// Async thunk to fetch snippets by project ID from Supabase
export const fetchSnippetsByProjectId = createAsyncThunk(
  "snippets/fetchSnippetsByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .eq("project_id", projectId);
      if (error) return rejectWithValue(error);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
); // new to be moved

// Async thunk to update a project's name and description in Supabase
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, projectName, description,navigate }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update({ project_name: projectName, description: description })
        .eq("project_id", projectId)
        .select();
      if (error) console.log(error);
      if (error) return rejectWithValue(error);
      console.log(data);
      navigate('/dashboard')
      return data[0];
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Async thunk to delete a project from Supabase
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async ({projectId}, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("project_id", projectId)
        .select();
      if (error) {
        console.log(error);
        return rejectWithValue(error);}
        console.log("Hey I am here",data)
        window.location.reload()
      return data;
    } catch (e) {
      console.log(e); 
      return rejectWithValue(e.message);
    }
  }
);


// Projects slice
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
    snippets: null,
    projectStatus: "idle",
    projectError: null,
    loading:false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
      state.projectStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
      state.projectStatus = "succeeded";
      state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
      state.projectStatus = "failed";
      state.error = action.error.message;
      })
      .addCase(addProject.pending, (state) => {
      state.status = "loading";
      })
      .addCase(addProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
      state.status = "idle";
      })
      .addCase(addProject.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "idle";
      })
      .addCase(updateProject.pending, (state) => {
      state.projectStatus = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
      state.projectStatus = "success";
      })
      .addCase(updateProject.rejected, (state, action) => {
      state.projectStatus = "idle";
      state.projectError = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
      state.projectStatus = "loading";
      state.projectError = null
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
      state.projectStatus = "success";
      
      })
      .addCase(deleteProject.rejected, (state, action) => {
      state.projectStatus = "idle";
      state.projectError = action.payload;
      });
  },
});

export const { clearError,setLoading } = projectsSlice.actions;
export default projectsSlice.reducer;