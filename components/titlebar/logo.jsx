import { useRouter } from "next/router";

import { LogoContainer } from "./logo.styles";

const Logo = () => {
  const { push } = useRouter();

  return (
    <LogoContainer
      onClick={() => {
        push("/");
      }}
    >
      <img style={{ height: 20 }} src={"/images/logo.png"} />
    </LogoContainer>
  );
};

export default Logo;
