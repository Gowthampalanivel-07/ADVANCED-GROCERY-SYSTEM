import { Hero } from '@/components/landing/Hero';
import { ScrollStories } from '@/components/landing/ScrollStories';
import { Dashboard } from '@/components/landing/Dashboard';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-gradient-to-b from-white via-emerald-50/40 to-white">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-tr from-green-300/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <Hero />
      <ScrollStories />
      <Dashboard />
      <Footer />
    </main>
  );
}
