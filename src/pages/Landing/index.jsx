import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Editor } from "@monaco-editor/react";
import { IoCopySharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import SnippetHeader from "../../components/SnippetHeader";
import { VscVersions } from "react-icons/vsc";
import { TbSearch } from "react-icons/tb";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Navigate,useNavigate } from "react-router";
import Footer from "../../components/Footer";
function Landing() {
    const navigate = useNavigate()
    const {isAuthenticated,loading} = useSelector(state=>state.auth)
    const language = ["Javascript", "Java", "python", "go", "html"];
    const [Lang, setLang] = useState("javascript");
    const [showCopy, setShowCopy] = useState(false);
    const handleCopy = (e) => {
        e.target.disabled = true;
        setShowCopy(true);
        setTimeout(() => {
            setShowCopy(false);
            e.target.disabled = false;
        }, 1000); // Adjust the timeout duration as needed
    };
    const code = `import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data);
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li>
      ))}
    </ul>
  );
}

                export default App;`;
    const LoginCode = `import React, { useState } from "react";

                function LoginPage() {
                    const [email, setEmail] = useState("");
                    const [password, setPassword] = useState("");

                    const handleSubmit = (e) => {
                        e.preventDefault();
                        console.log("Email:", email, "Password:", password);
                    };

                    return (
                        <div className="flex items-center justify-center h-screen bg-gray-900">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-gray-950 p-6 rounded shadow-md w-80"
                            >
                                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    );
                }

                export default LoginPage;`
    const handleStart = (e) => {
        if(isAuthenticated){
            navigate('/dashboard')
        }else{
            navigate('/login')
        }
    };
    const handleLangChange = (e) => {
        setLang(e.target.value);
    };
    // if(!isAuthenticated) return <Navigate to={'/'}></Navigate>
    if (loading) return <Loader></Loader>
    return (
        <div className="bg-gray-950 text-white">
            <Navbar></Navbar>
            <div className="w-full flex justify-center lg:pt-40 md:pt-30 pt-20" >
                <p className="lg:text-6xl sm:text-4xl text-3xl  font-semibold text-center">
                    Central Hub For Code Management
                </p>
            </div>
            <div className="w-full flex justify-center text-center pt-10">
                <p className="lg:text-4xl sm:text-3xl text-3xl  text-green-500">
                    Write And Save Once , Use Anytime With Ease
                </p>
            </div>
            <div className="mt-5 text-center lg:pl-60 lg:pr-60 md:pl-30 pl-10 pr-10 md:pr-30 flex justify-center">
                <p className="text-xl font-semibold">
                    Store code snippets and other valuable text assests in one easily
                    accessible locarion. No more searching through countless files or
                    scattered notes.
                </p>
            </div>
            <div className="flex justify-center pt-10">
                <button
                    onClick={handleStart}
                    className="pt-3 pb-3 pl-5 pr-5 border-1 bg-pink-600 font-semibold text-lg rounded cursor-pointer"
                >
                    START
                </button>
            </div>

            <div className="mt-15"></div>

            <div className="editorSpecs w-full lg:p-15 md:p-10 p-5">
                <div className="container border-1 p-2  w-full rounded">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 ">
                        <div className="editor max-h-[90vh]  lg:col-span-2 order-2 lg:order-1">
                            <div className="copy language grid grid-cols-4 gap-0.5 mb-1">
                                <div className="langugage col-span-3">
                                    <select
                                        name=""
                                        id=""
                                        className="w-full p-2 outline-0 bg-pink-800"
                                        onChange={handleLangChange}
                                    >
                                        {language.map((lang, index) => {
                                            return (
                                                <option key={index} value={lang}>
                                                    {lang}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="check col-span-1 flex justify-center bg-pink-800">
                                    <button onClick={handleCopy}>
                                        <IoCopySharp
                                            className={`${showCopy ? "hidden" : "visible"}`}
                                        />
                                    </button>
                                    <div
                                        className={`${showCopy ? "visible" : "hidden"
                                            } self-center text-center`}
                                    >
                                        <span className="text-green-400 font-semibold">
                                            <TiTick size={25} className="inline" />
                                            COPIED
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Editor
                                defaultLanguage="javascript"
                                language={Lang}
                                height={"60vh"}
                                value={code}
                                // className="p-2"
                                onChange={() => { }}
                                onMount={() => setLang()}
                                width={"100%"}
                                options={{ automaticLayout: true }}
                                theme="hc-black"
                            ></Editor>
                        </div>
                        <div className="text col-span-1 order-1">
                            <p className="text-center font-semibold text-2xl">
                                Multiple language support
                            </p>
                            <p className="font-normal pt-5 tracking-wide">
                                Easily write, organize, and manage code snippets across various
                                programming languages—all in one place. Our snippet app
                                intelligently detects and highlights syntax for languages like
                                JavaScript, Python, HTML, CSS, C++, Java, and many more.
                            </p>
                            <p className="pt-5">
                                {" "}
                                Whether you're switching between stacks or referencing old code,
                                your snippets stay clean, readable, and beautifully formatted.
                            </p>
                        </div>
                    </div>
                </div>
                {/* language support section */}
                <div className="pt-15 pl-10 pr-10 w-full">
                    {/* <SnippetHeader></SnippetHeader> */}
                    <div className="w-full text-3xl text-center font-sans text-gray-600">
                        Languages
                    </div>
                    <div className="overflow-hidden w-full mt-5">
                        <div className="flex animate-scroll space-x-10">
                            <i className="devicon-javascript-plain text-5xl"></i>
                            <i className="devicon-python-plain text-5xl"></i>
                            <i className="devicon-java-plain text-5xl"></i>
                            <i className="devicon-html5-plain text-5xl"></i>
                            <i className="devicon-css3-plain text-5xl"></i>
                            <i className="devicon-react-original text-5xl"></i>
                            <i className="devicon-nodejs-plain text-5xl"></i>
                            <i className="devicon-go-plain text-5xl"></i>
                            <i className="devicon-cplusplus-plain text-5xl"></i>
                        </div>
                    </div>

                    <style jsx='true'>{`
            @keyframes scroll {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }

            .animate-scroll {
              display: inline-flex;
              animation: scroll 15s linear infinite;
            }
          `}</style>
                </div>
                {/* version support section */}
                <div className="pt-10"></div>
                <div className="grid lg:grid-cols-2 gap-5 grid-cols-1">
                    <div className="version border-1 border-yellow-500 rounded-xl shadow-[0_0_5px_2px_#eab308]  p-5 ">
                        <div className="text-center">
                            <VscVersions className="inline" size={35} color="orange" />
                            <p className="inline text-2xl font-stretch-semi-expanded text-yellow-500">
                                {" "}
                                Version Setting
                            </p>
                        </div>
                        <p className="tracking-wider">
                            Keep track of changes and iterations in your code with ease. Our
                            version setting feature lets you assign version numbers to each
                            snippet—helping you manage updates, experiment with improvements,
                            or maintain multiple versions of the same logic. Whether you're
                            building a library, testing different approaches, or revisiting
                            past work, version tagging ensures your workflow stays organized
                            and future-proof.
                        </p>
                    </div>

                    <div className="search border-1 rounded-xl border-pink-500 p-5 shadow-[0_0_5px_2px_#eab308]">
                        <div className="text-center">
                            <TbSearch className="inline" size={35} color="orange" />
                            <p className="inline text-2xl font-stretch-extra-expanded text-yellow-500">
                                {" "}
                                Search Easily
                            </p>
                        </div>
                        <p className="tracking-wider">
                            Quickly find the right snippet when you need it. With our powerful
                            search feature, you can look up snippets by language, title, tags,
                            or content—making it easy to navigate large collections. Whether
                            you're jumping back to an old solution or hunting down a specific
                            function, smart search keeps your coding flow uninterrupted and
                            efficient.
                        </p>
                    </div>
                </div>
                {/* AI Code Generation Section */}
                <div
                    className="ai-code-gen p-5 mt-10 border-1 border-blue-500 rounded-xl  relative shadow-[0_0_5px_2px_#3b82f6]"
                    style={{
                        // backgroundImage: "url('/aicode.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0  opacity-50"></div>
                    <div className="relative text-center">
                        <p className="text-3xl font-semibold text-blue-400">
                            AI-Powered Code Generation
                        </p>
                    </div>
                    <p className="mt-5 text-lg tracking-wide relative">
                        Leverage the power of AI to generate code snippets tailored to your
                        needs. Specify the programming language, provide a brief
                        description, and let the AI create efficient, reusable code for you.
                        Save these snippets with version control for future reference and
                        seamless integration into your projects.
                    </p>
                    <p className="mt-2 tracking-wide relative">
                        Whether you're prototyping, learning a new language, or solving
                        complex problems, our AI assistant is here to help you code smarter
                        and faster.
                    </p>
                </div>
                {/* experiment section */}
                {/* Prebuilt UI Components Section */}
                <div className="mt-10">
                    <h2 className="text-3xl font-semibold text-center text-gray-400">
                        Use Prebuilt UI Components Like...
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-5 grid-cols-1 mt-5 ">
                        {/* Monaco Editor */}
                        <div className="editor border-1 border-gray-700 rounded-xl p-5 shadow-[0_0_5px_2px_#6b7280]">
                            <SnippetHeader onCopy={()=>{navigator.clipboard.writeText(LoginCode)}}></SnippetHeader>

                            <Editor
                                defaultLanguage="javascript"
                                language="javascript"
                                height={"50vh"}
                                value={LoginCode}
                                options={{readOnly:true, automaticLayout: true, formatOnPaste: true , formatOnType:true }}
                                theme="hc-black"
                                onMount={(editor, monaco) => {
                                    setTimeout(() => {
                                        editor.getAction('editor.action.formatDocument')?.run();
                                    }, 100);
                                }}
                            />
                        </div>

                        {/* Code Preview */}

                        <div className="preview border-1 border-gray-700 rounded-xl p-5 shadow-[0_0_5px_2px_#6b7280] bg-gray-900">
                            <div className="flex items-center justify-center h-full">
                                <div className="bg-gray-950 p-6 rounded shadow-md w-80">
                                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-2 border rounded"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border rounded"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Landing;

