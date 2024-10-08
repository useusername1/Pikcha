import { memo, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./styled";
import { IoIosArrowForward as RightArrowIcon } from "react-icons/io";
import { MdLocationOn as PinIcon } from "react-icons/md";
import { Blurhash } from "react-blurhash";
interface CarouselContentProps {
  data: {
    img: string;
    id: number;
    attractionId: number | undefined;
    title: string;
    subtitle: string;
    color: string;
    blur_hash: string;
    location: string;
  };
  isTransitionEnd: boolean;
}
const CarouselContent = memo(
  ({ data, isTransitionEnd }: CarouselContentProps) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const {
      img: imgUrl,
      id,
      attractionId,
      title,
      subtitle,
      color,
      blur_hash,
      location,
    } = data;
    const URL = attractionId
      ? `/attractions/detail/${attractionId}`
      : `/attractions`;
    const handleImgLoad = () => {
      setImgLoaded(true);
    };

    return (
      <S.CarouselItemContainer>
        <S.ImageWrapper isLoaded={imgLoaded}>
          <Blurhash
            hash={blur_hash}
            style={{ width: "100%", height: "100%" }}
          />
          <img
            src={imgUrl}
            alt={`carousel${id}`}
            loading={id === 3 ? "eager" : "lazy"}
            onLoad={handleImgLoad}
          />
        </S.ImageWrapper>
        <S.CarouselTextWrapper>
          <S.LeftCarouselTextWrapper
            isTransitionEnd={isTransitionEnd}
            textColor={color}
          >
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <Link to={URL}>
              더 보러가기
              <RightArrowIcon className="right-arrow" />
            </Link>
          </S.LeftCarouselTextWrapper>
          <S.RightCarouselTextWrapper
            isTransitionEnd={isTransitionEnd}
            textColor={color}
          >
            <span>
              <PinIcon className="location-pin" />
              {location}
            </span>
          </S.RightCarouselTextWrapper>
        </S.CarouselTextWrapper>
      </S.CarouselItemContainer>
    );
  }
);

export default CarouselContent;
