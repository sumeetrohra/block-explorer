import React, { Suspense } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const BlockPage = React.lazy(() => import("./pages/BlockPage"));
const TransactionPage = React.lazy(() => import("./pages/TransactionPage"));
const AddressPage = React.lazy(() => import("./pages/AddressPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/block/:blockNumber" element={<BlockPage />} />
            <Route path="/tx/:txHash" element={<TransactionPage />} />
            <Route path="/address/:pubAddress" element={<AddressPage />} />
          </Routes>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
