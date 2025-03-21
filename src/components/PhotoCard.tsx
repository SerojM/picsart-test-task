import styled from "styled-components";
import { Link } from "react-router-dom";

interface Photo {
    id: number;
    src: { medium: string; large: string };
    photographer: string;
    height: number;
    width: number;
    alt: string;
}

interface Props {
    photo: Photo;
}

const PhotoCard = ({ photo }: Props) => {
    return (
        <Card to={`/photo/${photo.id}`}>
            <ImageWrapper>
                <Image
                    src={photo.src.medium}
                    alt={photo.alt}
                    loading="lazy"
                />
            </ImageWrapper>
            <Photographer>{photo.photographer}</Photographer>
        </Card>
    );
};

export default PhotoCard;

const Card = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  border-radius: 10px;
`;

const Photographer = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 4px;
`;
