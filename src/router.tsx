import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhotoDetails from "./pages/PhotoDetails";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photo/:id" element={<PhotoDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
