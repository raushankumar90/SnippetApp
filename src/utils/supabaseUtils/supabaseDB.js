import supabase from "../../supabase/supabasse";

export async function insertProject(projectName, description) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ project_name: projectName, description: description }])
    .select();

  if (error) {
    console.error("Error inserting project:", error);
    return null;
  }

  console.log("Inserted project:", data);
  return data;
}

export async function fetchSnippetsByProjectId(projectId) {
  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .eq("project_id", projectId);

  if (error) {
    console.error("Error fetching snippets:", error);
    return null;
  }

  console.log("Fetched snippets:", data);
  return data;
}

export async function updateSnippetCode(snippetId, snippetCode) {
  const { data, error } = await supabase
    .from("snippets")
    .update({ snippet_code: snippetCode })
    .eq("snippet_id", snippetId)
    .select();

  if (error) {
    console.error("Error updating snippet code:", error);
    return null;
  }

  console.log("Updated snippet:", data);
  return data;
}