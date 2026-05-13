# PhishGuard

A modern security awareness application built with Svelte and Vite. Clean architecture, optimized workflow, and developer-friendly structure.

---

## 📁 Project Structure

### Directory Overview

```
PhishGuard/
├── src/
│   ├── App.svelte          # Root app component (blank slate)
│   ├── app.css             # Global styles, layout, colors, spacing
│   ├── main.js             # App entry point
│   └── lib/
│       ├── components/     # Reusable Svelte components
│       │   └── Counter.svelte (example)
│       └── assets/
│           └── images/     # All app images live here
│               └── index.js (centralized exports)
├── public/                 # Static files (favicons, etc.)
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build configuration
└── jsconfig.json           # JavaScript/TypeScript config
```

---

## 🖼️ Images: `public/` vs `src/lib/assets/images/`

### **`public/` directory**
- **Purpose**: Static assets that don't need processing
- **Use for**:
  - Favicons (`favicon.ico`, `favicon.svg`)
  - Static robots.txt, manifest.json
  - Large files that don't change
- **Behavior**: Files are copied as-is; served from root in dev and build
- **Reference in HTML**: Use absolute paths like `/favicon.ico`

### **`src/lib/assets/images/`** (Recommended for app images)
- **Purpose**: Optimized image imports with bundling support
- **Use for**:
  - App UI graphics, logos, icons
  - Images you import into components
  - Assets that should be version-hashed for cache-busting
- **Behavior**: Processed by Vite; optimized and bundled; gets content hash
- **Reference in code**: Use ES imports for best optimization

### Best Practice
```javascript
// ✅ Good: Import images from src/lib/assets/images/
import { logoImage } from './lib/assets/images/index.js'

// Use in templates
<img src={logoImage} alt="Logo" />
```

---

## 📦 Scripts & Commands

All npm scripts are optimized for your workflow:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run dev:host` | Dev server on 0.0.0.0 (network access) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run preview:host` | Preview on 0.0.0.0 (network access) |
| `npm run check` | Type-check Svelte files |
| `npm run check:watch` | Watch mode type-checking |
| `npm run validate` | Full check: type-check + build test |
| `npm run type-check` | Alias for `check` |
| `npm run lint:check` | Alias for `check` |

### Workflow
```bash
# Daily development
npm run dev                 # Start, make changes (auto-reloads)
npm run check              # Check for errors before commit
npm run build              # Test production build

# Full validation before merge
npm run validate           # Type-check + build (comprehensive)

# Sharing your work locally
npm run dev:host           # Share on network
npm run preview:host       # Preview production on network
```

---

## 🎨 Key Files Guide

### **`src/App.svelte`**
- Root component for your entire app
- Define page layout, sections, routing logic here
- Currently a blank slate—ready for your content

### **`src/app.css`**
- Global styles (resets, colors, spacing system)
- CSS variables, responsive utilities
- Layout foundation for all components

### **`src/lib/assets/images/index.js`**
- **Single export point** for all app images
- Import all images here, export them together
- Keeps imports clean: `import { logo, icon } from './lib/assets/images/index.js'`

**Example `index.js`:**
```javascript
import logo from './logo.svg'
import heroImage from './hero.png'
import icon from './icon.svg'

export { logo, heroImage, icon }
```

### **`src/lib/components/`**
- Reusable UI components
- One component per file
- Import into App.svelte or other components

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start developing**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

3. **Add your content**
   - Edit `src/App.svelte` to build your pages
   - Style with `src/app.css`
   - Create components in `src/lib/components/`

4. **Before pushing code**
   ```bash
   npm run validate
   ```

5. **Build for production**
   ```bash
   npm run build
   ```
   Output in `dist/` directory

---

## 📝 Development Tips

- **Component reuse**: Create new `.svelte` files in `src/lib/components/`
- **Styling**: Use global styles in `app.css` + scoped styles in components
- **Images**: Always export from `src/lib/assets/images/index.js`
- **Type safety**: Run `npm run check:watch` while coding for instant feedback

---

## 🔧 Configuration

- **Vite**: `vite.config.js` (build & dev settings)
- **Svelte**: Configured in `vite.config.js` via plugin
- **JavaScript Config**: `jsconfig.json` (path aliases, type checking)

---

## 📄 License

MIT (or your chosen license)

---

**Happy coding! 🎉**
# PhishGuard
