import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { PostDetail } from './components/PostDetail';
import { Archive } from './components/Archive';
import { About } from './components/About';
import { Tags } from './components/Tags';
import { SearchPage } from './components/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tag" element={<Tags />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

        <footer className="bg-white border-t mt-12 py-8 text-center text-gray-400 text-sm">
          © 2026 Blog. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;