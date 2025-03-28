import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { Box, useColorModeValue } from "@chakra-ui/react";

import Navbar from "./components/NavBar";
import LoadingSpinner from "./components/LoadingSpinner";

const HomePage = lazy(() => import("./pages/HomePage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

function App() {
    return (
        <Box
            maxW={"1140px"}
            minH="100vh"
            mx="auto"
            bgColor={useColorModeValue("gray.200", "gray.900")}
        >
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                </Routes>
            </Suspense>
        </Box>
    );
}

export default App;
