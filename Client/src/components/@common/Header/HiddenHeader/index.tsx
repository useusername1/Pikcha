import { Header } from "../DefaultHeader";
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";
import * as S from "./styled";
import useClickDetect from "~/hooks/useClickDetect";
interface HiddeHeaderProps {
  selectedMenu?: number;
}
const HiddenHeader = ({ selectedMenu = 2 }: HiddeHeaderProps) => {
  const { ref, isVisible, setIsVisible } = useClickDetect();

  const handleArrowClick = () => {
    setIsVisible((p) => !p);
  };
  return (
    <header ref={ref as React.RefObject<HTMLHeadElement>}>
      <Header>
        <S.HiddenHeaderTopWrapper
          isVisible={isVisible}
          onClick={handleArrowClick}
        >
          <Header.HeaderTop />
          <ArrowDownIcon className="arrow-down" />
        </S.HiddenHeaderTopWrapper>
        <S.HiddenHeaderBodyWrapper isVisible={isVisible}>
          <Header.HeaderBody
            searchBarOn={false}
            defaultValue={""}
            backgroundOn={false}
            selectedMenu={selectedMenu}
          />
        </S.HiddenHeaderBodyWrapper>
      </Header>
    </header>
  );
};
export default HiddenHeader;
