import { signIn } from "next-auth/react";
import { FullScreenContainer, LoginButton } from "./style";

const Login = () => {
  return (
    <FullScreenContainer>
      <LoginButton onClick={() => signIn("spotify", { callbackUrl: "/" })}>
        Login with spotify
      </LoginButton>
    </FullScreenContainer>
  );
};

export default Login;
