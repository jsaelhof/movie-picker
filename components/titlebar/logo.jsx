import { useRouter } from "next/router";

import { LogoContainer } from "./logo.styles";

const Logo = () => {
  const { push } = useRouter();

  return (
    <LogoContainer
      onClick={() => {
        push("/");
      }}
      aria-label="Movie Decider 4000"
    >
      <img style={{ height: 20 }} src={"/images/logo.png"} />
    </LogoContainer>
  );
};

export default Logo;
