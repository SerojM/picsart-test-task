import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PhotoCard from "../PhotoCard";

const photo = {
    id: 123,
    src: {
        medium: "https://example.com/image.jpg",
        large: "https://example.com/image-large.jpg",
    },
    photographer: "John Doe",
};

describe("PhotoCard", () => {
    it("renders photo and photographer", () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={photo} />
            </BrowserRouter>
        );

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", photo.src.medium);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("has link to photo details", () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={photo} />
            </BrowserRouter>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/photo/${photo.id}`);
    });
});
