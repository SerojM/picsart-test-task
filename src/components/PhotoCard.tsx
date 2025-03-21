import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface PhotoProps {
    photo: {
        id: number;
        src: { medium: string; large: string };
        photographer: string;
    };
}

const PhotoCard = memo(({ photo }: PhotoProps) => {
    return (
        <Card>
            <Link to={`/photo/${photo.id}`}>
                <Image src={photo.src.medium} alt="Photo" loading="lazy" />
            </Link>
            <Photographer>{photo.photographer}</Photographer>
        </Card>
    );
});

export default PhotoCard;

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const Photographer = styled.p`
  padding: 8px;
  font-size: 14px;
  color: #555;
`;
