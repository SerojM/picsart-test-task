import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import PhotoCard from "../components/PhotoCard";

interface Photo {
    id: number;
    src: { medium: string; large: string };
    photographer: string;
    height: number;
    width: number;
    alt: string;
}

interface Props {
    photos: Photo[];
    columnCount: number;
}

const VirtualizedMasonry = ({ photos, columnCount }: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    const gap = 12;

    const positions = useMemo(() => {
        if (!containerRef.current) return [];

        const containerWidth = containerRef.current?.clientWidth;
        const columnWidth = (containerWidth - (columnCount - 1) * gap) / columnCount;
        const columnHeights = Array(columnCount).fill(0);

        return photos.map((photo) => {
            const aspectRatio = photo.height / photo.width;
            const height = columnWidth * aspectRatio;
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
            const top = columnHeights[shortestColumn];
            const left = shortestColumn * (columnWidth + gap);
            columnHeights[shortestColumn] += height + gap;

            return { top, left, height, photo };
        });
    }, [photos, columnCount]);

    const containerHeight = useMemo(() => {
        return positions.length ? Math.max(...positions.map(p => p.top + p.height)) : 0;
    }, [positions]);

    useEffect(() => {
        const onScroll = () => setScrollTop(window.scrollY);
        const onResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <Grid ref={containerRef} style={{ height: containerHeight }}>
            {positions.map(({ top, left, height, photo }) => {
                const isVisible =
                    top + height >= scrollTop - viewportHeight &&
                    top <= scrollTop + 2 * viewportHeight;

                if (!isVisible) return null;

                return (
                    <CardWrapper
                        key={photo.id}
                        style={{ top, left, width: `${100 / columnCount}%`, height }}
                    >
                        <PhotoCard photo={photo} />
                    </CardWrapper>
                );
            })}
        </Grid>
    );
};

export default VirtualizedMasonry;

const Grid = styled.div`
  position: relative;
  width: 100%;
`;

const CardWrapper = styled.div`
  position: absolute;
  padding-bottom: 12px;
  box-sizing: border-box;
  overflow: hidden;
`;
