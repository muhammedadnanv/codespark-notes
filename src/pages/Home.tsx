import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Zap, FileCode } from "lucide-react";
import logo from "@/assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AI Notepad" className="w-8 h-8" />
            <span className="text-lg font-semibold text-foreground">AI Notepad</span>
          </div>
          <Link to="/editor">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Launch Editor
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <img 
              src={logo} 
              alt="AI Notepad Logo" 
              className="w-24 h-24 mx-auto mb-8 animate-pulse"
              style={{ 
                filter: "drop-shadow(0 0 20px hsl(var(--accent)))" 
              }}
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Code Smarter,{" "}
            <span className="text-primary">Not Harder</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent writing space that understands code. 
            Automatic syntax highlighting, AI-powered suggestions, 
            and a distraction-free environment built for developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/editor">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-lg shadow-primary/20"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Writing
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Smart Code Detection
              </h3>
              <p className="text-muted-foreground text-sm">
                Automatically detects and formats code snippets with syntax highlighting for multiple languages
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                AI Assistant
              </h3>
              <p className="text-muted-foreground text-sm">
                Get instant code suggestions, error explanations, and generate snippets on demand
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground text-sm">
                Built for speed with auto-save and a distraction-free interface that keeps you in flow
              </p>
            </div>
          </div>

          {/* Quick Feature List */}
          <div className="pt-12 flex flex-wrap justify-center gap-4">
            {[
              "JavaScript", "TypeScript", "Python", "Java", "C++", "Auto-save"
            ].map((feature) => (
              <div 
                key={feature}
                className="px-4 py-2 bg-secondary rounded-full text-sm text-muted-foreground border border-border"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Built for developers who value speed and intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
