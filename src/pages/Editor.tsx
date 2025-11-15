import { useState, useEffect } from "react";
import { EditorComponent } from "@/components/Editor";
import { AIAssistant } from "@/components/AIAssistant";
import { Header } from "@/components/Header";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";

const Editor = () => {
  const { settings } = useSettings();
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

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const { shortcuts } = settings;
      
      // Parse shortcut string (e.g., "Ctrl+S" to check ctrl and s)
      const parseShortcut = (shortcut: string) => {
        const parts = shortcut.toLowerCase().split('+');
        const hasCtrl = parts.includes('ctrl');
        const hasAlt = parts.includes('alt');
        const hasShift = parts.includes('shift');
        const key = parts[parts.length - 1];
        return { hasCtrl, hasAlt, hasShift, key };
      };

      // Save shortcut
      const saveShortcut = parseShortcut(shortcuts.save);
      if (
        e.ctrlKey === saveShortcut.hasCtrl &&
        e.altKey === saveShortcut.hasAlt &&
        e.shiftKey === saveShortcut.hasShift &&
        e.key.toLowerCase() === saveShortcut.key
      ) {
        e.preventDefault();
        localStorage.setItem("notepad-content", content);
        toast.success("Note saved!");
      }

      // New note shortcut
      const newShortcut = parseShortcut(shortcuts.newNote);
      if (
        e.ctrlKey === newShortcut.hasCtrl &&
        e.altKey === newShortcut.hasAlt &&
        e.shiftKey === newShortcut.hasShift &&
        e.key.toLowerCase() === newShortcut.key
      ) {
        e.preventDefault();
        if (confirm("Create a new note? Current note will be saved.")) {
          localStorage.setItem("notepad-content", content);
          setContent("");
          toast.success("New note created!");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [content, settings]);

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
          <EditorComponent 
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

export default Editor;
