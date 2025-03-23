import Typewriter from "./components/Typewriter";

const Login = () => {
  return (
    <div className="relative z-10 p-4 w-full min-w-screen">
      <h1 className="responsive-h2 text-white font-semibold text-center w-full">
        StreamList
      </h1>
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen pb-10">
        <div className="bg-black/60 border-2 border-red-600 rounded-xl p-4">
          <Typewriter text="Maake movies and shows even more memorable with StreamList!" />
        </div>
        <a className="responsive-h3 font-bold mb-4 text-white text-center mt-11 underline decoration-3 decoration-red-500 underline-offset-4 cursor-pointer" href="/api/auth/signin">Get started now!</a>
      </div>
    </div>
  );
};

export default Login;
