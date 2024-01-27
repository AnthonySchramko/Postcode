import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import CreatePage from "../../pages/CreatePage/CreatePage";

const AppContainer = () => {
  return (
    <div>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<DetailsPage />} />
            <Route path="/add" element={<CreatePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default AppContainer;
