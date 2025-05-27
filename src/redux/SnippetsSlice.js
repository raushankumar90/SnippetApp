import supabase from "../supabase/supabasse";
import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  snippets: {},
  loading: false,
  error: null,
};

// fetch snippets using project_id
export const fetchSnippetsByProjectId = createAsyncThunk(
  "snippets/fetchSnippetsByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .eq("project_id", projectId)
        .order('created_at')
      if (error) return rejectWithValue(error.message);
      return { data, projectId };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteSnippetById = createAsyncThunk(
  "snippets/deleteSnippetById",
  async ({ snippetId }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("snippets")
        .delete()
        .eq("id", snippetId);

      if (error) {
        throw error;
      }

      return snippetId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addSnippet = createAsyncThunk(
  "snippets/addSnippet",
  async (
    {
      projectName,
      snippetName,
      projectId,
      snippetVersion,
      description,
      snippetLanguage,
      navigate,
    },
    { rejectWithValue }
  ) => {
    console.log("ProjectName", projectName);
    const { data, error } = await supabase
      .from("snippets")
      .insert([
        {
          project_name: projectName,
          snippet_name: snippetName,
          project_id: projectId,
          snippet_version: snippetVersion,
          description: description,
          snippet_language: snippetLanguage,
        },
      ])
      .select();
    if (error) return rejectWithValue(error);
    console.log("Returned Data", data);
    // navigate("/snippets/" + data[0].project_id);
    navigate("/addcode/snippet/" + data[0].snippet_id, {
      state: {
        snippet: data[0],
      },
    });
    return { data: data, projectId };
  }
);

export const updateSnippetDetails = createAsyncThunk(
  "snippets/updateSnippetDetails",
  async ({ snippetId, snippetName, snippetVersion, snippetLanguage, description,navigate }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("snippets")
        .update({
          snippet_name: snippetName,
          snippet_version: snippetVersion,
          snippet_language: snippetLanguage,
          description: description,
        })
        .eq("snippet_id", snippetId)
        .select();

      if (error) {
        return rejectWithValue(error.message);
      }
      navigate('/snippets/'+data[0].project_id,{state:{projectName:""}})
      return { snippetId, snippetName, snippetVersion, snippetLanguage, description, data:data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateSnippetCode = createAsyncThunk(
  "snippets/updateSnippetCode",
  async ({ snippetId, snippetCode }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("snippets")
        .update({ snippet_code: snippetCode })
        .eq("snippet_id", snippetId)
        .select();

      if (error) {
        return rejectWithValue(error.message);
      }

      return { snippetId, snippetCode, data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteSnippetBySnippetId = createAsyncThunk(
  "snippets/deleteSnippetBySnippetId",
  async (snippetId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("snippets")
        .delete()
        .eq("snippet_id", snippetId);

      if (error) {
        return rejectWithValue(error.message);
      }

      return snippetId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const snippetsSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {
    setSnippets: (state, action) => {
      const { projectId, snippetId, code } = action.payload;
      const snippetsArray = state.snippets[projectId];
      if (snippetsArray) {
        const snippet = snippetsArray.find(s => s.snippet_id === snippetId);
        if (snippet) {
          console.log(snippet)
          snippet.snippet_code = code;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippetsByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnippetsByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets[action.payload.projectId] = action.payload.data;
      })
      .addCase(fetchSnippetsByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSnippetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSnippetById.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = state.snippets.filter(
          (snippet) => snippet.id !== action.payload
        );
      })
      .addCase(deleteSnippetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSnippet.fulfilled, (state, action) => {
        state.loading = false;
        if (state.snippets[action.payload.projectId]) {
          state.snippets[action.payload.projectId].push(action.payload.data[0]);
        } else {
          state.snippets[action.payload.projectId] = action.payload.data;
        }
      })
      .addCase(addSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSnippetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSnippetCode.fulfilled, (state, action) => {
        state.loading = false;
        const { snippetId, snippetCode, data } = action.payload;
        // Find the project containing this snippet
        for (const projectId in state.snippets) {
          const snippetsArr = state.snippets[projectId];
          const snippet = snippetsArr.find(s => s.snippet_id === snippetId);
          if (snippet) {
            snippet.snippet_code = snippetCode;
            console.log("Done",current(state.snippets))
            break;
          }
        }
      })
      .addCase(updateSnippetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSnippetDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSnippetDetails.fulfilled, (state, action) => {
        state.loading = false;
        const { snippetId, snippetName, snippetVersion, snippetLanguage, description ,data} = action.payload;
        for (const projectId in state.snippets) {
          const snippetsArr = state.snippets[projectId];
          const snippet = snippetsArr.find(s => s.snippet_id === snippetId);
          if (snippet) {
            snippet.snippet_name = snippetName;
            snippet.snippet_version = snippetVersion;
            snippet.snippet_language = snippetLanguage;
            snippet.description = description;
            break;
          }
        }
        console.log(data)
      })
      .addCase(updateSnippetDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSnippetBySnippetId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSnippetBySnippetId.fulfilled, (state, action) => {
        state.loading = false;
        const snippetId = action.payload;
        for (const projectId in state.snippets) {
          state.snippets[projectId] = state.snippets[projectId].filter(
            (snippet) => snippet.snippet_id !== snippetId
          );
        }
      })
      .addCase(deleteSnippetBySnippetId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setSnippets } = snippetsSlice.actions;
export default snippetsSlice.reducer;
