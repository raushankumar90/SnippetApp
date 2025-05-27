import supabase from "../../supabase/supabasse";

export function SignupWithGoogle(){
    try{
        supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: "http://localhost:5173/login",
              },
            });
    }catch(e){
        console.log("Error Signup With Google",e.message)
    }
}