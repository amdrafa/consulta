import { Routes, Route } from "react-router-dom";
import { Tutorial } from "./pages/tutorial";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Tutorial />} />
        </Routes>
    )
}