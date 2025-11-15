import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AIAssistantProps {
  selectedText: string;
  onInsertCode: (code: string) => void;
}

export const AIAssistant = ({ selectedText, onInsertCode }: AIAssistantProps) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAIRequest = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const { data, error } = await supabase.functions.invoke("ai-assist", {
        body: {
          prompt: prompt,
          context: selectedText,
        },
      });

      if (error) throw error;

      if (data.error) {
        if (data.error.includes("Rate limits")) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
        } else if (data.error.includes("Payment required")) {
          toast.error("AI credits exhausted. Please add credits to continue.");
        } else {
          toast.error(data.error);
        }
        return;
      }

      setResponse(data.response);
    } catch (error: any) {
      console.error("AI request error:", error);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-foreground">AI Assistant</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Get instant help with code suggestions and explanations
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {selectedText && (
          <Card className="p-3 bg-secondary border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Selected text:</p>
            <p className="text-sm text-foreground font-mono">{selectedText.slice(0, 100)}...</p>
          </Card>
        )}

        <div className="space-y-2">
          <Textarea
            placeholder="Ask AI to explain code, fix errors, or generate snippets..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-background border-border"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleAIRequest();
              }
            }}
          />
          <Button
            onClick={handleAIRequest}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI
              </>
            )}
          </Button>
        </div>

        {response && (
          <Card className="p-4 bg-code-bg border-accent/30 shadow-lg shadow-accent/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-accent">AI Response</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onInsertCode(response)}
                className="h-7 text-xs hover:bg-accent/10"
              >
                Insert
              </Button>
            </div>
            <div className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {response}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
