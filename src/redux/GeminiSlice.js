import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import supabase from "../supabase/supabase";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const initialState = {
  gemini: {
    loading: false,
    error: null,
    data: null,
  },
};

// Async thunk to fetch Gemini data from Supabase
export const fetchGeminiResponse = createAsyncThunk(
  "gemini/fetchGeminiData",
  async ({ prompt,language }, { rejectWithValue }) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Uncomment if you want to use a different model
        contents: prompt+ ' Write the code in '+language,
        maxOutputTokens: 1000,
        temperature: 0.5,
        config:{
          systemInstruction:'You are a code generation AI. You will be given a prompt and you have to generate code for it. The code should be in the language specified in the prompt. If no language is specified, use JavaScript by default. Do not give improvements or suggestions, just generate the code as per the prompt.',
        }
      });
      console.log("Gemini response:", response.text);
      const genericTrimmed = response.text.replace(/^```[\w]*\s*|```$/g, '');
      return genericTrimmed;
    } catch (e) {
      console.error("Error in fetchGeminiData thunk:", e);
      return rejectWithValue(e.message);
    }
  }
);

const geminiSlice = createSlice({
  name: "gemini",
  initialState,
  reducers: {
    setData:(state)=>{
      state.gemini.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeminiResponse.pending, (state) => {
        state.gemini.loading = true;
        state.gemini.error = null;
      })
      .addCase(fetchGeminiResponse.fulfilled, (state, action) => {
        state.gemini.loading = false;
        state.gemini.data = action.payload;
      })
      .addCase(fetchGeminiResponse.rejected, (state, action) => {
        state.gemini.loading = false;
        state.gemini.error = action.payload;
      });
  },
});

export const { actions, reducer } = geminiSlice;
export const selectGemini = (state) => state.gemini.gemini;
export const { setData } = geminiSlice.actions;
export default geminiSlice.reducer;