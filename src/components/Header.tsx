import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center gap-3 px-6 py-4">
        <img src={logo} alt="AI Notepad" className="w-8 h-8" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Notepad</h1>
          <p className="text-xs text-muted-foreground">Developer Edition</p>
        </div>
      </div>
    </header>
  );
};
