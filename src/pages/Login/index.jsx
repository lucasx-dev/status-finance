import { useContext } from "react";
import logogoogle from "../../assets/logo-google.png";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import { LoginContent } from "../../components/LoginContent";
import videoBg from "../../assets/vd2.mp4";
export const Login = () => {
  const { signInWithGoogle, signed } = useContext(AuthGoogleContext);
  async function LoginGoogle() {
    await signInWithGoogle();
  }
  if (!signed) {
    return (
      <div className="w-full h-full select-none ">
        <div>
          <video
            src={videoBg}
            className="w-screen h-screen absolute flex blur-sm saturate-0 object-cover"
            autoPlay
            loop
            muted
          ></video>
        </div>
        <LoginContent
          logogoogle={logogoogle}
          LoginGoogle={LoginGoogle}
          videoBg={videoBg}
        />
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
};
