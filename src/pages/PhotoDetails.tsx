import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchPhotoById } from "../api/pexels";

interface Photo {
    id: number;
    src: { large: string };
    photographer: string;
    alt: string;
}

const PhotoDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const loadPhoto = async () => {
            setLoading(true);
            try {
                const result = await fetchPhotoById(id!);
                setPhoto(result);
            } catch (err) {
                console.error("Failed to fetch photo by ID", err);
                setPhoto(null);
            }
            setLoading(false);
        };

        loadPhoto();
    }, [id]);

    return (
        <PageWrapper>
            <Container>
                {loading ? (
                    <Loading>Loading...</Loading>
                ) : photo ? (
                    <>
                        <ImageContainer>
                            {!imageLoaded && <LoadingImage>Loading image...</LoadingImage>}
                            <Image
                                src={photo.src.large}
                                alt={photo.alt}
                                onLoad={() => setImageLoaded(true)}
                                style={{ display: imageLoaded ? "block" : "none" }}
                            />
                        </ImageContainer>
                        <Details>
                            <Title>{photo.alt || "Untitled"}</Title>
                            <DescriptionContainer>
                                <Description>
                                    {photo.alt
                                        ? `A beautiful capture of ${photo.alt.toLowerCase()}.`
                                        : "No description available."}
                                </Description>
                            </DescriptionContainer>
                            <Info>Photographer: {photo.photographer}</Info>
                            <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                        </Details>
                    </>
                ) : (
                    <Message>Photo not found</Message>
                )}
            </Container>
        </PageWrapper>
    );
};

export default PhotoDetails;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const LoadingImage = styled.p`
  position: absolute;
  font-size: 18px;
  color: #555;
`;

const Details = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin: 10px 0;
  max-width: 600px;
  text-align: center;
`;

const Info = styled.p`
  font-size: 14px;
  color: #444;
  margin: 5px 0;
`;

const BackButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Loading = styled.p`
  font-size: 18px;
  text-align: center;
  color: #555;
`;

const Message = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: red;
`;
