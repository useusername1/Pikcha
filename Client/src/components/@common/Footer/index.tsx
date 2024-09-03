import { useNavigate } from "react-router-dom";
import * as S from "./styled";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { CgFigma as FigmaIcon } from "react-icons/cg";
import { IoMailOutline as EmailIcon } from "react-icons/io5";
import { ReactComponent as Logo } from "~/assets/Logo.svg";
import { contributors } from "~/data/contributorData";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <S.LogoContainer>
          <Logo onClick={() => navigate("/")} />
        </S.LogoContainer>
        <S.MadePeopleContainer>
          {contributors.map((person, i) => (
            <S.ContributorLink
              href={person.link}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              <S.FooterText>&nbsp;{`${person.name}`}&nbsp;</S.FooterText>
            </S.ContributorLink>
          ))}
        </S.MadePeopleContainer>

        <S.LinkWrapper>
          <S.LinkIconContainer
            href="https://github.com/codestates-seb/seb41_main_036"
            className="github-icon"
          >
            <GithubIcon />
          </S.LinkIconContainer>
          <S.LinkIconContainer
            href="https://www.figma.com/file/iFs2WMfNlUTOA6ILnCljk3/main-project?node-id=0%3A1&t=FKufgjpDJAMZQ80B-1"
            className="figma-icon"
          >
            <FigmaIcon />
          </S.LinkIconContainer>
          <S.EmailContainer>
            <EmailIcon />
            명소 등록 & 사이트 문의 :
            <a href="mailto:pikchainc@gmail.com"> &nbsp;pikchainc@gmail.com</a>
          </S.EmailContainer>
        </S.LinkWrapper>
        <hr />
        <S.FooterBottomContainer>
          <S.FooterBottomText>
            &copy; 2023. PIKCHA. All rights reserved.
          </S.FooterBottomText>
          <S.FooterBottomText>이용약관</S.FooterBottomText>
          <S.FooterBottomText>개인정보처리방침</S.FooterBottomText>
          <S.FooterBottomText>제휴제안</S.FooterBottomText>
        </S.FooterBottomContainer>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
};

export default Footer;
