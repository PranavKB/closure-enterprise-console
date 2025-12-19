# Closure Enterprise Console
 
 An Employee Management Dashboard built with Google Closure Compiler and Closure Library. This application demonstrates an enterprise-grade architecture for managing employee records, featuring a data grid, status indicators, and interactive state management.
 
 ## 🏗️ Architecture
 
 This project uses Google Closure Tools for advanced JavaScript optimization:
 
 - **Closure Compiler**: Compiles and optimizes JavaScript with ADVANCED mode
 - **Closure Library**: Provides robust utilities and DOM manipulation
 - **Namespace-based modules**: Uses `goog.provide()` and `goog.require()`
 
 ## 📁 Project Structure

```
closure-enterprise-console/
├── src/
│   ├── app/
│   │   ├── main.js           # Application entry point
│   │   └── bootstrap.js      # Initialization logic
│   ├── controllers/
│   │   └── DashboardController.js
│   └── tests/
│       └── SanityTest.js
├── closure-library/          # Google Closure Library (submodule/dependency)
├── dist/
│   └── app.min.js           # Compiled output
├── index.html               # Production (loads compiled code)
├── index-dev.html           # Development (loads source files)
├── build.bat                # Build script
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Use the development HTML for debugging with uncompiled sources:

```bash
npm run serve
# Open http://localhost:8080/index-dev.html
```

### Production Build

Compile the application with advanced optimizations:

```bash
npm run build
# or
build.bat
```

Then serve the production version:

```bash
npm run serve
# Open http://localhost:8080/index.html
```

## 🔧 How It Works

### Build Process

1. **Closure Compiler** analyzes all dependencies starting from `app.main`
2. **ADVANCED optimization** mode:
   - Renames all variables/functions
   - Removes dead code
   - Inlines functions
   - Optimizes for size and speed
3. Outputs single minified file: `dist/app.min.js`

### Application Flow
 
 ```mermaid
 graph TD
     A[index.html] -->|loads| B[app.min.js]
     B -->|starts| C[app.main.start]
     C -->|initializes| D[app.bootstrap.init]
     D -->|creates| E[DashboardController]
     E -->|uses| F[EmployeeService]
     E -->|renders| G[EmployeeTable]
     F -->|fetches| H[Data Source]
     H -->|data| F
     F -->|data| E
     E -->|props| G
 ```
 
 1. **Initialization**: `app.bootstrap.init()` locates the root element and creates the `DashboardController`.
 2. **Data Loading**: `DashboardController` calls `EmployeeService.loadFromApi()` to fetch employee data.
 3. **Rendering**: 
    - `DashboardController` initializes `EmployeeTable`.
    - Data is passed to `EmployeeTable.render()`.
    - The table component generates the DOM structure (rows, cells, buttons).
 4. **Interaction**:
    - Clicking an Action button triggers a callback in `DashboardController`.
    - The controller updates the state via `EmployeeService`.
    - `EmployeeService` toggles the active status.
    - The controller re-fetches or re-renders the table with updated data.

### Closure Library Patterns

**Declaring a namespace:**
```javascript
goog.provide('app.controllers.DashboardController');
```

**Requiring dependencies:**
```javascript
goog.require('goog.dom');
goog.require('app.bootstrap');
```

**Type annotations (for compiler optimization):**
```javascript
/**
 * @constructor
 * @param {!Element} rootEl
 */
app.controllers.DashboardController = function(rootEl) {
  /** @private {!Element} */
  this.rootEl = rootEl;
};
```

## 📝 Key Files

- **`src/app/main.js`**: Entry point, auto-starts the application
- **`src/app/bootstrap.js`**: Finds root element and initializes controller
- **`src/controllers/DashboardController.js`**: Main dashboard logic
- **`build.bat`**: Compilation script with Closure Compiler flags

## 🧪 Testing

Tests are located in `src/tests/` and use Closure's testing framework.

## 📦 Dependencies

- `google-closure-compiler`: JavaScript optimizer and compiler

## 🔍 Troubleshooting

**App doesn't start:**
- Check browser console for errors
- Ensure `#app` div exists in HTML
- Verify `app.main.start()` is called

**Build fails:**
- Check that all `goog.require()` statements have matching `goog.provide()`
- Verify file paths in `build.bat`
- Ensure type annotations are correct

**Development mode not working:**
- Use `index-dev.html` instead of `index.html`
- Ensure `closure-library` is properly installed
- Check browser console for dependency loading errors
