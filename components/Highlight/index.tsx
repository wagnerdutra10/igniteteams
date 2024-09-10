import { Ionicons } from "@expo/vector-icons";
import { Container, SubTitle, Title } from "./styles";
import logo from "@/assets/images/logo.png";

type Props = {
  title?: string;
  subTitle?: string;
};

export function Highlight({ subTitle, title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
}
