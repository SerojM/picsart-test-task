import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { fetchPhotos } from "../api/pexels";
import MasonryGrid from "../components/MasonryGrid";

interface Photo {
    id: number;
    src: { medium: string; large: string };
    photographer: string;
    height: number;
    width: number;
    alt: string;
}

const getColumnCount = (width: number) => {
    if (width > 1200) return 5;
    if (width > 900) return 4;
    if (width > 600) return 3;
    return 2;
};

const Home = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem("lastSearchQuery") || "nature";
    });
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [columnCount, setColumnCount] = useState(getColumnCount(window.innerWidth));

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        fetchPhotos(debouncedQuery, 30, 1).then((data) => setPhotos(data));
    }, [debouncedQuery]);

    useEffect(() => {
        const handleResize = () => setColumnCount(getColumnCount(window.innerWidth));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        localStorage.setItem("lastSearchQuery", value);
    };

    return (
        <Container>
            <SearchInput
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <MasonryGrid photos={photos} columnCount={columnCount} />
        </Container>
    );
};

export default Home;

const Container = styled.div`
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
