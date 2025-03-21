import styled from "styled-components";
import PhotoCard from "../components/PhotoCard";

interface Photo {
    id: number;
    src: { medium: string; large: string };
    photographer: string;
    height: number;
    width: number;
}

interface MasonryGridProps {
    photos: Photo[];
    columnCount: number;
}

const MasonryGrid = ({ photos, columnCount }: MasonryGridProps) => {
    const columns: Photo[][] = Array.from({ length: columnCount }, () => []);
    photos.forEach((photo, i) => {
        columns[i % columnCount].push(photo);
    });

    return (
        <Grid>
            {columns.map((col, i) => (
                <Column key={i}>
                    {col.map((photo) => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </Column>
            ))}
        </Grid>
    );
};

export default MasonryGrid;

const Grid = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
