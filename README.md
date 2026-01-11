# Markdown Preview

A modern, real-time Markdown editor and previewer built with Next.js 16 and React 19.

## Features ✨

- **📝 Live Preview**: See your markdown rendered in real-time as you type.
- **🎨 Syntax Highlighting**: Beautiful code block highlighting for various languages.
- **📁 Drag & Drop**: Simply drag and drop your `.md` or `.markdown` files directly into the editor to load them.
- **⚡ GitHub Flavored Markdown**: Full support for GFM features like tables, task lists, strikethrough, and more.
- **🌗 Resizable Split View**: Adjust the width of the editor and preview panes to your liking.
- **👁️ Zen Mode**: Toggle the visibility of the Editor or Preview panes to focus on what matters.
- **🌙 Dark Mode**: A sleek, dark-themed interface designed for comfortable writing.

## Tech Stack 🛠️

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Markdown Engine**:
  - [`react-markdown`](https://github.com/remarkjs/react-markdown)
  - [`remark-gfm`](https://github.com/remarkjs/remark-gfm) (GFM support)
  - [`rehype-highlight`](https://github.com/rehypejs/rehype-highlight) (Syntax highlighting)
  - [`rehype-raw`](https://github.com/rehypejs/rehype-raw) (HTML support)

## Getting Started 🚀

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/md-preview.git
   cd md-preview
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage 📖

1. **Writing**: Start typing standard markdown in the left editor pane.
2. **Loading Files**: Drag and drop any `.md` file from your computer into the browser window.
3. **Resizing**: Drag the divider between the editor and preview panes to adjust their size.
4. **View Controls**: Use the status bar at the bottom to:
   - Toggle the **Editor** view on/off.
   - Toggle the **Preview** view on/off.
   - **Clear** the current content.

## License 📄

This project is open source and available under the [MIT License](LICENSE).
