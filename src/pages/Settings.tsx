import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Settings as SettingsIcon, Save, RotateCcw } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState("appearance");

  const fontSizeMap = {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
  };

  const handleReset = () => {
    resetSettings();
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/editor" className="hover:opacity-80 transition-opacity">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <img src={logo} alt="AI Notepad" className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">Settings</h1>
                <p className="text-xs text-muted-foreground">Customize your experience</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
          </TabsList>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Theme Settings</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Editor Theme</Label>
                  <Select
                    value={settings.editorTheme}
                    onValueChange={(value) => updateSettings({ editorTheme: value as any })}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark (Default)</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="monokai">Monokai</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred color scheme for the code editor
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Editor Preferences</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select
                    value={settings.fontSize}
                    onValueChange={(value) => updateSettings({ fontSize: value as any })}
                  >
                    <SelectTrigger id="fontSize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (12px)</SelectItem>
                      <SelectItem value="medium">Medium (14px)</SelectItem>
                      <SelectItem value="large">Large (16px)</SelectItem>
                      <SelectItem value="xlarge">Extra Large (18px)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Adjust the font size for better readability
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Preview</Label>
                  <Card className="p-4 bg-code-bg">
                    <pre
                      className="text-foreground font-mono"
                      style={{ fontSize: `${fontSizeMap[settings.fontSize]}px` }}
                    >
                      {`function example() {\n  console.log("Hello, World!");\n  return true;\n}`}
                    </pre>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">AI Configuration</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aiModel">AI Model</Label>
                  <Select
                    value={settings.aiModel}
                    onValueChange={(value) => updateSettings({ aiModel: value as any })}
                  >
                    <SelectTrigger id="aiModel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google/gemini-2.5-flash">
                        Gemini 2.5 Flash (Balanced)
                      </SelectItem>
                      <SelectItem value="google/gemini-2.5-pro">
                        Gemini 2.5 Pro (Most Capable)
                      </SelectItem>
                      <SelectItem value="google/gemini-2.5-flash-lite">
                        Gemini 2.5 Flash Lite (Fastest)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose the AI model that best fits your needs
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="autoSuggest">Auto-Suggest</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable automatic AI suggestions while typing
                    </p>
                  </div>
                  <Switch
                    id="autoSuggest"
                    checked={settings.aiAutoSuggest}
                    onCheckedChange={(checked) => updateSettings({ aiAutoSuggest: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contextLength">Context Length</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.aiContextLength} characters
                    </span>
                  </div>
                  <Slider
                    id="contextLength"
                    min={100}
                    max={1000}
                    step={100}
                    value={[settings.aiContextLength]}
                    onValueChange={([value]) => updateSettings({ aiContextLength: value })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Amount of text context sent to AI for better suggestions
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Shortcuts Tab */}
          <TabsContent value="shortcuts" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Keyboard Shortcuts</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="saveShortcut">Save Note</Label>
                    <Input
                      id="saveShortcut"
                      value={settings.shortcuts.save}
                      onChange={(e) =>
                        updateSettings({
                          shortcuts: { ...settings.shortcuts, save: e.target.value },
                        })
                      }
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aiShortcut">AI Assist</Label>
                    <Input
                      id="aiShortcut"
                      value={settings.shortcuts.aiAssist}
                      onChange={(e) =>
                        updateSettings({
                          shortcuts: { ...settings.shortcuts, aiAssist: e.target.value },
                        })
                      }
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newShortcut">New Note</Label>
                    <Input
                      id="newShortcut"
                      value={settings.shortcuts.newNote}
                      onChange={(e) =>
                        updateSettings({
                          shortcuts: { ...settings.shortcuts, newNote: e.target.value },
                        })
                      }
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="searchShortcut">Search</Label>
                    <Input
                      id="searchShortcut"
                      value={settings.shortcuts.search}
                      onChange={(e) =>
                        updateSettings({
                          shortcuts: { ...settings.shortcuts, search: e.target.value },
                        })
                      }
                      className="font-mono"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customize keyboard shortcuts to match your workflow. Use format: Ctrl+Key, Alt+Key, Shift+Key
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
