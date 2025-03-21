import { fetchPhotos } from "../pexels";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchPhotos", () => {
    it("fetches and returns photos", async () => {
        const mockPhotos = [{ id: 1 }, { id: 2 }];
        mockedAxios.get.mockResolvedValueOnce({ data: { photos: mockPhotos } });

        const result = await fetchPhotos("nature", 2, 1);
        expect(mockedAxios.get).toHaveBeenCalled();
        expect(result).toEqual(mockPhotos);
    });

    it("returns empty array on error", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Error"));
        const result = await fetchPhotos("fail", 2, 1);
        expect(result).toEqual([]);
    });
});
