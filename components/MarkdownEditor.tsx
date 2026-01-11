'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

const INITIAL_MARKDOWN = `# Welcome to Markdown Live Preview! 🎉

Start typing or **drag and drop** a markdown file to begin.

## Features ✨

- 📝 **Live Preview** - See your markdown rendered in real-time
- 🎨 **Syntax Highlighting** - Beautiful code blocks with syntax highlighting
- 📁 **Drag & Drop** - Simply drag your .md files onto the editor
- 🌙 **Dark Theme** - Easy on the eyes with a modern dark interface

## Try it out!

### Code Example

\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet('World');
\`\`\`

### Lists

- Item one
- Item two
  - Nested item
- Item three

### Table

| Feature | Status |
|---------|--------|
| Live Preview | ✅ |
| Syntax Highlighting | ✅ |
| Drag & Drop | ✅ |

### Links

Check out [GitHub](https://github.com) for more!

> **Tip:** You can drag and drop any .md file to load it instantly!
`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('untitled.md');
  const [editorMinimized, setEditorMinimized] = useState(false);
  const [previewMinimized, setPreviewMinimized] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle resizing
  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setSplitPosition(Math.min(Math.max(newPosition, 20), 80));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const mdFile = files.find(file =>
      file.name.endsWith('.md') || file.name.endsWith('.markdown')
    );

    if (mdFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setMarkdown(content);
        setFileName(mdFile.name);
      };
      reader.readAsText(mdFile);
    } else {
      alert('Please drop a markdown (.md or .markdown) file');
    }
  }, []);

  const handleClear = () => {
    setMarkdown('');
    setFileName('untitled.md');
  };

  return (
    <>
      <div className="fade-in" ref={containerRef}>
        {/* Main Editor Area - Full Screen Zen Mode */}
        <div
          className="flex"
          style={{ height: 'calc(100vh - 24px)' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Editor Panel */}
          {!editorMinimized && (
            <div
              className={`editor-container ${isDragging ? 'scale-105' : ''} rounded-none border-0 border-r`}
              style={{
                transition: isResizing ? 'none' : 'all 0.3s ease',
                width: previewMinimized ? '100%' : `${splitPosition}%`,
                borderColor: 'hsla(var(--border))',
                height: '100%',
              }}
            >
              <textarea
                className="editor-textarea"
                style={{ height: '100%' }}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type your markdown here or drag and drop a .md file..."
                spellCheck={false}
              />
            </div>
          )}

          {/* Resizable Divider */}
          {!editorMinimized && !previewMinimized && (
            <div
              onMouseDown={handleMouseDown}
              className="w-1 cursor-col-resize hover:bg-white/30 active:bg-white/50 transition-colors relative flex-shrink-0"
              style={{
                background: 'hsla(var(--border))',
                userSelect: 'none',
                height: '100%',
              }}
              title="Drag to resize"
            />
          )}

          {/* Preview Panel */}
          {!previewMinimized && (
            <div
              className="markdown-preview rounded-none"
              style={{
                transition: isResizing ? 'none' : 'all 0.3s ease',
                width: editorMinimized ? '100%' : `${100 - splitPosition}%`,
                height: '100%',
                border: 'none',
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}

          {/* Minimized Editor Button */}
          {editorMinimized && (
            <button
              onClick={() => setEditorMinimized(false)}
              className="fixed left-4 top-1/2 -translate-y-1/2 px-3 py-2 text-xs rounded transition-all hover:bg-white/10"
              style={{
                background: 'hsla(0, 0%, 5%, 0.95)',
                border: '1px solid hsla(var(--border))',
                color: 'hsl(var(--text-primary))',
                writingMode: 'vertical-rl',
                zIndex: 10,
              }}
              title="Show Editor"
            >
              Editor
            </button>
          )}

          {/* Minimized Preview Button */}
          {previewMinimized && (
            <button
              onClick={() => setPreviewMinimized(false)}
              className="fixed right-4 top-1/2 -translate-y-1/2 px-3 py-2 text-xs rounded transition-all hover:bg-white/10"
              style={{
                background: 'hsla(0, 0%, 5%, 0.95)',
                border: '1px solid hsla(var(--border))',
                color: 'hsl(var(--text-primary))',
                writingMode: 'vertical-rl',
                zIndex: 10,
              }}
              title="Show Preview"
            >
              Preview
            </button>
          )}
        </div>

        {/* Drop Overlay */}
        {isDragging && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-none" style={{ zIndex: 99998 }}>
            <div className="dropzone active">
              <div className="text-3xl mb-3">↓</div>
              <h2 className="text-xl font-light mb-2">Drop markdown file</h2>
              <p className="text-xs" style={{ color: 'hsl(var(--text-secondary))' }}>
                .md or .markdown
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar - Full Width & Minimal Height */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 w-full"
        style={{
          height: '24px',
          background: '#000000',
          borderTop: '1px solid #333333',
          zIndex: 99999,
          fontFamily: 'sans-serif',
        }}
      >
        <div className="flex items-center gap-8">
          <button
            onClick={() => setEditorMinimized(!editorMinimized)}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors outline-none"
            style={{
              fontSize: '11px',
              background: 'transparent',
              border: 'none',
              borderRadius: '0',
              color: '#ffffff',
              padding: '0 8px',
              height: '24px'
            }}
            title="Toggle Editor"
          >
            <span>Editor</span>
            <span style={{ opacity: 0.5 }}>{!editorMinimized ? '✓' : '○'}</span>
          </button>
          <button
            onClick={() => setPreviewMinimized(!previewMinimized)}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors outline-none"
            style={{
              fontSize: '11px',
              background: 'transparent',
              border: 'none',
              borderRadius: '0',
              color: '#ffffff',
              padding: '0 8px',
              height: '24px'
            }}
            title="Toggle Preview"
          >
            <span>Preview</span>
            <span style={{ opacity: 0.5 }}>{!previewMinimized ? '✓' : '○'}</span>
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={handleClear}
            className="hover:text-gray-300 transition-colors outline-none"
            style={{
              fontSize: '11px',
              background: 'transparent',
              border: 'none',
              borderRadius: '0',
              color: '#ffffff',
              padding: '0 8px',
              height: '24px'
            }}
            title="Clear"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
