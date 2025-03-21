import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PhotoDetails from "../PhotoDetails";
import { fetchPhotoById } from "../../api/pexels";
import { describe, it, expect, vi, beforeEach} from "vitest";

vi.mock("../../api/pexels", () => ({
    fetchPhotoById: vi.fn()
}));

describe("PhotoDetails Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders photo details when loaded", async () => {
        (fetchPhotoById as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            id: 1,
            src: { large: "img_large.jpg" },
            photographer: "Alice",
            alt: "Sunset",
        });

        render(
            <MemoryRouter initialEntries={["/photo/1"]}>
                <Routes>
                    <Route path="/photo/:id" element={<PhotoDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Alice/i)).toBeInTheDocument();
            expect(screen.getByAltText(/Sunset/i)).toBeInTheDocument();
        });
    });

    it("shows 'Photo not found' if fetch fails", async () => {
        (fetchPhotoById as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Not found"));

        render(
            <MemoryRouter initialEntries={["/photo/999"]}>
                <Routes>
                    <Route path="/photo/:id" element={<PhotoDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Photo not found")).toBeInTheDocument();
        });
    });
    it("navigates back when 'Back' button is clicked", async () => {
        (fetchPhotoById as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            id: 1,
            src: { large: "img_large.jpg" },
            photographer: "Alice",
            alt: "Sunset",
        });

        render(
            <MemoryRouter initialEntries={["/photo/1"]} initialIndex={0}>
                <Routes>
                    <Route path="/photo/:id" element={<PhotoDetails />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Back")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Back"));

    });
});
