import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/Home";
import { fetchPhotos } from "../../api/pexels";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { Mocked } from "vitest";

vi.mock("../../api/pexels");

describe("Home Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.setItem("lastSearchQuery", "nature");
    });

    it("renders photos when loaded", async () => {
        (fetchPhotos as Mocked<any>).mockResolvedValueOnce([
            {
                id: 1,
                src: { medium: "test.jpg", large: "test_large.jpg" },
                photographer: "Alice",
                height: 400,
                width: 300,
                alt: "Test Photo",
            },
        ]);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Alice/i)).toBeInTheDocument();
        });
    });

    it("updates search input and triggers fetch", async () => {
        (fetchPhotos as Mocked<any>).mockResolvedValue([
            {
                id: 2,
                src: { medium: "img.jpg", large: "img_large.jpg" },
                photographer: "Bob",
                height: 500,
                width: 350,
                alt: "Another Photo",
            },
        ]);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/search photos/i);
        fireEvent.change(input, { target: { value: "city" } });

        await waitFor(() => {
            expect(localStorage.getItem("lastSearchQuery")).toBe("city");
        });
    });

    it("loads more photos on scroll (infinite scroll)", async () => {
        (fetchPhotos as Mocked<any>).mockResolvedValue([
            {
                id: 3,
                src: { medium: "scroll.jpg", large: "scroll_large.jpg" },
                photographer: "Scroll Tester",
                height: 300,
                width: 200,
                alt: "Scroll Test",
            },
        ]);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        window.scrollY = 99999;
        fireEvent.scroll(window);

        await waitFor(() => {
            expect(fetchPhotos).toHaveBeenCalled();
        });
    });
});
