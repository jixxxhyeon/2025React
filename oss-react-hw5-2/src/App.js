import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import ListPage from "./components/ListPage";
import DetailPage from "./components/DetailPage";
import UpdatePage from "./components/UpdatePage";
import CreatePage from "./components/CreatePage";

function App() {
  return (
    <BrowserRouter>
      <div className="container py-3">
        <header className="mb-3 d-flex justify-content-between align-items-center">
          <h2 className="m-0">React CRUD Page (mockapi.io)</h2>
          <nav className="d-flex gap-2">
            <Link to="/list" className="btn btn-outline-secondary btn-sm">
              List
            </Link>
            <Link to="/create" className="btn btn-outline-primary btn-sm">
              Create
            </Link>
          </nav>
        </header>

        <Routes>
          {/* / 접속 시 /list 로 이동 */}
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/create" element={<CreatePage />} />

          {/* 잘못된 주소는 리스트로 */}
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
