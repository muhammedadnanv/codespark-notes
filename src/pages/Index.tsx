import { useState, useEffect } from "react";
import { Editor } from "@/components/Editor";
import { AIAssistant } from "@/components/AIAssistant";
import { Header } from "@/components/Header";
import { toast } from "sonner";

const Index = () => {
  const [content, setContent] = useState("");
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    // Load saved content from localStorage
    const saved = localStorage.getItem("notepad-content");
    if (saved) {
      setContent(saved);
    }
  }, []);

  useEffect(() => {
    // Auto-save content
    const timer = setTimeout(() => {
      if (content) {
        localStorage.setItem("notepad-content", content);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [content]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
    }
  };

  const handleInsertText = (text: string) => {
    setContent(prev => prev + "\n\n" + text);
    toast.success("Code inserted!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <Editor 
            content={content}
            onChange={handleContentChange}
            onSelect={handleTextSelection}
          />
        </div>
        <AIAssistant 
          selectedText={selectedText}
          onInsertCode={handleInsertText}
        />
      </div>
    </div>
  );
};

export default Index;
