import { useContext } from "react";
import logogoogle from "../../assets/logo-google.png";
import graphic_image from "../../assets/graphic_image.jpg";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import { LoginContent } from "../../components/LoginContent";

export const Login = () => {
	const { signInWithGoogle, signed } = useContext(AuthGoogleContext);
	async function LoginGoogle() {
		await signInWithGoogle();
	}
	if (!signed) {
		return (
			<div className="w-full h-full select-none">
				<LoginContent
					logogoogle={logogoogle}
					LoginGoogle={LoginGoogle}
					graphic_image={graphic_image}
				/>
			</div>
		);
	} else {
		return <Navigate to="/home" />;
	}
};
