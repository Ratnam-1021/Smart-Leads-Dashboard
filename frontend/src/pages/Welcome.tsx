import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col justify-center items-center px-4">
      
      {/* Starry Background */}
      <div className="absolute inset-0 starry-bg pointer-events-none"></div>
      
      {/* Central Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* Navbar (Simple Logo) */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center glow-blue">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-xl font-bold tracking-wide">GigFlow</h1>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <Link to="/login" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer glow-blue">
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up" style={{ opacity: 0 }}>
          <span className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mr-3">New</span>
          <span className="text-gray-300 text-sm font-medium">Smart Leads Management Pipeline</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '150ms', opacity: 0 }}>
          Smart AI Solutions for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 italic">Growing Businesses</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up font-medium" style={{ animationDelay: '300ms', opacity: 0 }}>
          We build simple tools that help you save time, reduce costs, and grow faster. 
          Automation, analytics, and smart systems built to make your business better.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '450ms', opacity: 0 }}>
          <Link 
            to="/register" 
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all glow-blue cursor-pointer"
          >
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            to="/login"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-gray-300 bg-transparent border border-gray-800 hover:bg-gray-900 hover:text-white rounded-lg transition-all cursor-pointer text-center"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
