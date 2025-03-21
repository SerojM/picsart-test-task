import { render, screen } from "@testing-library/react";
import PhotoCard from "../PhotoCard";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect} from "vitest";

describe("PhotoCard Component", () => {
    const photo = {
        id: 1,
        src: {
            medium: "https://example.com/photo-medium.jpg",
            large: "https://example.com/photo-large.jpg",
        },
        photographer: "Test Photographer",
        height: 600,
        width: 400,
        alt: "Test Alt Text",
    };

    it("renders image and photographer name", () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={photo} />
            </BrowserRouter>
        );

        const imgElement = screen.getByAltText("Test Alt Text");
        const photographer = screen.getByText("Test Photographer");

        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", photo.src.medium);
        expect(photographer).toBeInTheDocument();
    });
});
