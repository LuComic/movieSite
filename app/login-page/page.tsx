import LoginComp from "../components/LoginComp";
import Typewriter from "../components/Typewriter";

const Login = () => {
  return (
    <div className="relative z-10 p-4">
      <h1 className="responsive-h2 text-white font-semibold text-center w-full">
        MovieStats
      </h1>
      <div className="flex flex-col gap-6 lg:flex-row xl:flex-row md:flex-row items-center justify-center w-full h-full min-h-screen pb-10">
        <div className="w-2xl">
          <Typewriter text="Make movies and shows even more memorable with MovieStats!" />
        </div>
        <LoginComp />
      </div>
    </div>
  );
};

export default Login;
