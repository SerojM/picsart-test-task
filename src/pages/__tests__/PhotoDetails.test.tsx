import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PhotoDetails from "../PhotoDetails";
import { fetchPhotos } from "../../api/Pexels";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
        useNavigate: () => mockNavigate,
    };
});

vi.mock("../../api/pexels");

describe("PhotoDetails", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.setItem("lastSearchQuery", "nature");
    });

    it("renders photo details when loaded successfully", async () => {
        (fetchPhotos as vi.Mock).mockResolvedValueOnce([
            {
                id: 1,
                src: { large: "img_large.jpg" },
                photographer: "Alice",
                alt: "Sunset View",
            },
        ]);

        render(
            <MemoryRouter initialEntries={["/photo/1"]}>
                <PhotoDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            const image = screen.queryByAltText(/sunset view/i);
            expect(image).toBeInTheDocument();
            expect(screen.getByText(/Alice/i)).toBeInTheDocument();
        });
    });

    it("shows 'Photo not found' when photo is missing", async () => {
        (fetchPhotos as vi.Mock).mockResolvedValueOnce([]);

        render(
            <MemoryRouter initialEntries={["/photo/999"]}>
                <PhotoDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Photo not found")).toBeInTheDocument();
        });
    });

    it("navigates back when 'Back' button is clicked", async () => {
        (fetchPhotos as vi.Mock).mockResolvedValueOnce([
            {
                id: 1,
                src: { large: "img_large.jpg" },
                photographer: "Alice",
                alt: "Sunset View",
            },
        ]);

        render(
            <MemoryRouter initialEntries={["/photo/1"]}>
                <PhotoDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            const backButton = screen.getByText("Back");
            fireEvent.click(backButton);
            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });
    });
});
