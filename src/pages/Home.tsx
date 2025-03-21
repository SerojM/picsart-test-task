import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPhotos } from "../api/pexels";
import VirtualizedMasonry from "../components/VirtualizedMasonry";

interface Photo {
    id: number;
    src: { medium: string; large: string };
    photographer: string;
    height: number;
    width: number;
    alt: string;
}

const getColumnCount = (width: number) => {
    if (width > 1400) return 5;
    if (width > 1024) return 4;
    if (width > 768) return 3;
    return 2;
};

const Home = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem("lastSearchQuery") || "nature";
    });
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [columnCount, setColumnCount] = useState(getColumnCount(window.innerWidth));
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        setPhotos([]);
        setPage(1);
    }, [debouncedQuery]);

    useEffect(() => {
        const loadPhotos = async () => {
            if (isLoading) return;
            setIsLoading(true);
            const newPhotos = await fetchPhotos(debouncedQuery, 80, page);
            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
            setIsLoading(false);
        };

        loadPhotos();
    }, [debouncedQuery, page]);

    useEffect(() => {
        const handleResize = () => setColumnCount(getColumnCount(window.innerWidth));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                !isLoading
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]);

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
            <VirtualizedMasonry photos={photos} columnCount={columnCount} />
            {isLoading && <LoadingText>Loading more photos...</LoadingText>}
        </Container>
    );
};

export default Home;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 200px;
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

  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 14px;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-top: 20px;
`;
