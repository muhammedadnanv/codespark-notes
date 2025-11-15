import { useEffect, useRef } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import html from "react-syntax-highlighter/dist/esm/languages/hljs/xml";

// Register languages
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", html);

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  onSelect: () => void;
}

const detectCodeBlocks = (text: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: Array<{ type: "text" | "code"; content: string; language?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: "code",
      content: match[2],
      language: match[1] || "javascript",
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return parts.length > 0 ? parts : [{ type: "text" as const, content: text }];
};

export const Editor = ({ content, onChange, onSelect }: EditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const parts = detectCodeBlocks(content);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onMouseUp={onSelect}
            placeholder="Start typing... Use ``` to create code blocks (e.g., ```javascript)"
            className="w-full bg-transparent text-foreground font-mono text-sm resize-none outline-none min-h-[calc(100vh-12rem)]"
            style={{ 
              caretColor: "hsl(var(--primary))",
            }}
          />
          {content && (
            <div className="mt-6 space-y-4 pointer-events-none">
              {parts.map((part, index) => (
                <div key={index}>
                  {part.type === "code" ? (
                    <div className="rounded-lg overflow-hidden border border-border shadow-lg">
                      <div className="bg-secondary px-4 py-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                          {part.language}
                        </span>
                      </div>
                      <SyntaxHighlighter
                        language={part.language}
                        style={atomOneDark}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          background: "hsl(var(--code-bg))",
                        }}
                      >
                        {part.content}
                      </SyntaxHighlighter>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
