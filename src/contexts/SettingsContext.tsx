import React, { createContext, useContext, useState, useEffect } from "react";

export type EditorTheme = "dark" | "light" | "monokai" | "github";
export type FontSize = "small" | "medium" | "large" | "xlarge";
export type AIModel = "google/gemini-2.5-flash" | "google/gemini-2.5-pro" | "google/gemini-2.5-flash-lite";

interface KeyboardShortcuts {
  save: string;
  aiAssist: string;
  newNote: string;
  search: string;
}

interface Settings {
  editorTheme: EditorTheme;
  fontSize: FontSize;
  aiModel: AIModel;
  aiAutoSuggest: boolean;
  aiContextLength: number;
  shortcuts: KeyboardShortcuts;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  editorTheme: "dark",
  fontSize: "medium",
  aiModel: "google/gemini-2.5-flash",
  aiAutoSuggest: false,
  aiContextLength: 500,
  shortcuts: {
    save: "Ctrl+S",
    aiAssist: "Ctrl+K",
    newNote: "Ctrl+N",
    search: "Ctrl+F",
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("notepad-settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("notepad-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
