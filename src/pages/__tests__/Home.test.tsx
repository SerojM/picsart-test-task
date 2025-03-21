import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";
import { fetchPhotos } from "../../api/pexels";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../api/pexels");

describe("Home Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders search input and fetches photos", async () => {
        (fetchPhotos as jest.Mock).mockResolvedValue([
            { id: 1, src: { medium: "img1.jpg", large: "img1_large.jpg" }, photographer: "Alice" },
            { id: 2, src: { medium: "img2.jpg", large: "img2_large.jpg" }, photographer: "Bob" },
        ]);

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText("Search photos...");
        expect(input).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.getByText("Bob")).toBeInTheDocument();
        });
    });

    it("updates search query and fetches new images", async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText("Search photos...");
        fireEvent.change(input, { target: { value: "mountains" } });

        await waitFor(() => {
            expect(localStorage.getItem("lastSearchQuery")).toBe("mountains");
        });
    });
});
