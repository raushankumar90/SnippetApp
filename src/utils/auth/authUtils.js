import supabase from "../../supabase/supabasse";

export function SignupWithGoogle(){
    try{
        supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: "https://snippet-app-pied.vercel.app",
              },
            });
    }catch(e){
        console.log("Error Signup With Google",e.message)
    }
}