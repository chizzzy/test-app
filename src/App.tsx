import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddProductForm, ProductList } from 'pages';
import { Header } from 'components';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
