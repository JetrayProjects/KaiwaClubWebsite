import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { SectionsGrid } from './components/sections/SectionsGrid';

function App() {
  return (
    <Layout>
      <Hero />
      <div id="content" className="bg-kaiwa-bg pb-8">
        <SectionsGrid />
      </div>
    </Layout>
  );
}

export default App;
