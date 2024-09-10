import { BackIcon, Container, Logo } from "./styles";
import logo from "@/assets/images/logo.png";
import { router } from "expo-router";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  function handleBackIcon() {
    router.navigate("/");
  }

  return (
    <Container>
      {showBackButton && (
        <BackIcon name="chevron-back" onPress={handleBackIcon} />
      )}
      <Logo source={logo} />
    </Container>
  );
}
