import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { headerVisibilityAtom } from "~/recoil/header/atoms";
import { Header } from "../DefaultHeader";
import throttle from "~/utils/throttle";
interface FixedHeaderOnScrollUpProps {
  defaultValue?: string;
}
const ScrollResponsiveHeader = ({
  defaultValue = "",
}: FixedHeaderOnScrollUpProps) => {
  const pageOffsetRef = useRef<number | null>(null);
  const [headerVisibility, setHeaderVisibility] =
    useRecoilState(headerVisibilityAtom);

  const handleScroll = () => {
    if (pageOffsetRef.current === null) pageOffsetRef.current = 0;
    const { scrollY } = window;
    const deltaY = scrollY - pageOffsetRef.current;
    const isVisible = scrollY === 0 || deltaY < 0;
    setHeaderVisibility(isVisible);
    pageOffsetRef.current = scrollY;
  };

  const handlethrottleScroll = throttle(handleScroll, 300);
  useEffect(() => {
    window.addEventListener("scroll", handlethrottleScroll);
    return () => {
      window.removeEventListener("scroll", handlethrottleScroll);
    };
  }, []);

  return (
    <>
      <Header isVisible={headerVisibility} headerColor="white">
        <Header.HeaderTop />
        <Header.HeaderBody defaultValue={defaultValue} />
      </Header>
    </>
  );
};
export default ScrollResponsiveHeader;
