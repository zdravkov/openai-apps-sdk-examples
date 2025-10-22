# Apps SDK Examples 

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

This repository showcases example UI components to be used with the Apps SDK, as well as example MCP servers that expose a collection of components as tools.
It is meant to be used as a starting point and source of inspiration to build your own apps for ChatGPT.

## UI Framework

This project uses **KendoReact Free** - the free version of Progress Telerik's KendoReact component library. KendoReact Free provides a comprehensive set of high-quality React UI components that are perfect for building professional applications. The free version includes essential components like buttons, inputs, grids, forms, and more without requiring a commercial license.

Key benefits of using KendoReact Free:
- 📦 No license required for free components
- 🎨 Professional, polished UI components
- ♿ Built-in accessibility features
- 📱 Responsive design support
- 🛠️ TypeScript support out of the box

Learn more about KendoReact Free at [kendoreact.com](https://www.telerik.com/kendo-react-ui/components/).

## MCP + Apps SDK overview

The Model Context Protocol (MCP) is an open specification for connecting large language model clients to external tools, data, and user interfaces. An MCP server exposes tools that a model can call during a conversation and returns results according to the tool contracts. Those results can include extra metadata—such as inline HTML—that the Apps SDK uses to render rich UI components (widgets) alongside assistant messages.

Within the Apps SDK, MCP keeps the server, model, and UI in sync. By standardizing the wire format, authentication, and metadata, it lets ChatGPT reason about your connector the same way it reasons about built-in tools. A minimal MCP integration for Apps SDK implements three capabilities:

1. **List tools** – Your server advertises the tools it supports, including their JSON Schema input/output contracts and optional annotations (for example, `readOnlyHint`).
2. **Call tools** – When a model selects a tool, it issues a `call_tool` request with arguments that match the user intent. Your server executes the action and returns structured content the model can parse.
3. **Return widgets** – Alongside structured content, return embedded resources in the response metadata so the Apps SDK can render the interface inline in the Apps SDK client (ChatGPT).

Because the protocol is transport agnostic, you can host the server over Server-Sent Events or streaming HTTP—Apps SDK supports both.

The MCP servers in this demo highlight how each tool can light up widgets by combining structured payloads with `_meta.openai/outputTemplate` metadata returned from the MCP servers.

## Repository structure

### Source Components (`src/`)

The `src/` folder contains all the UI components and utilities that are bundled into reusable widgets:

#### Widget Components (KendoReact Free)
- **`action-button/`** - Interactive action button components
- **`buttons/`** - Collection of KendoReact button components
- **`cards/`** - Card layout components for displaying content
- **`dateinputs/`** - KendoReact date picker and date input components
- **`dialogs/`** - Modal dialogs and popup components
- **`drawer/`** - Side navigation drawer components
- **`dropdowns/`** - KendoReact dropdown menu and selection components
- **`form/`** - KendoReact form components with validation
- **`grid/`** - KendoReact data grid and table components
- **`header/`** - Header and navigation components
- **`loaders/`** - Loading indicators and spinners
- **`rating/`** - Star rating and review components
- **`result/`** - Result display and status components


#### Utilities
- **`utils/`** - Shared utility functions and helpers
- **`index.css`** - Global styles and CSS variables
- **`media-queries.ts`** - Responsive design utilities
- **`types.ts`** - TypeScript type definitions
- **`use-display-mode.ts`** - Display mode detection hook
- **`use-max-height.ts`** - Maximum height calculation hook
- **`use-openai-global.ts`** - OpenAI SDK integration utilities
- **`use-widget-props.ts`** - Widget property management hook
- **`use-widget-state.ts`** - Widget state management hook

Each widget component is self-contained and includes its own CSS, JavaScript, and HTML template that gets bundled during the build process.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Python 3.10+ (for the Python MCP server)

## Install dependencies

Clone the repository and install the workspace dependencies:

```bash
pnpm install
```

> Using npm or yarn? Install the root dependencies with your preferred client and adjust the commands below accordingly.

## Build the components gallery

The components are bundled into standalone assets that the MCP servers serve as reusable UI resources.

```bash
pnpm run build
```

This command runs `build-all.mts`, producing versioned `.html`, `.js`, and `.css` files inside `assets/`. Each widget is wrapped with the CSS it needs so you can host the bundles directly or ship them with your own server.

To iterate locally, you can also launch the Vite dev server:

```bash
pnpm run dev
```

## Serve the static assets

If you want to preview the generated bundles without the MCP servers, start the static file server after running a build:

```bash
pnpm run serve
```

The assets are exposed at [`http://localhost:4444`](http://localhost:4444) with CORS enabled so that local tooling (including MCP inspectors) can fetch them.

## Run the MCP servers

The repository ships several demo MCP servers that highlight different widget bundles:

- **Pizzaz (Node & Python)** – pizza-inspired collection of tools and components
- **Solar system (Python)** – 3D solar system viewer

Every tool response includes plain text content, structured JSON, and `_meta.openai/outputTemplate` metadata so the Apps SDK can hydrate the matching widget.

### Pizzaz Node server

```bash
cd pizzaz_server_node
pnpm start
```

### Pizzaz Python server

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r pizzaz_server_python/requirements.txt
uvicorn pizzaz_server_python.main:app --port 8000
```

### Solar system Python server

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r solar-system_server_python/requirements.txt
uvicorn solar-system_server_python.main:app --port 8000
```

You can reuse the same virtual environment for all Python servers—install the dependencies once and run whichever entry point you need.

## Testing in ChatGPT

To add these apps to ChatGPT, enable [developer mode](https://platform.openai.com/docs/guides/developer-mode), and add your apps in Settings > Connectors.

To add your local server without deploying it, you can use a tool like [ngrok](https://ngrok.com/) to expose your local server to the internet.

For example, once your mcp servers are running, you can run:

```bash
ngrok http 8000
```

You will get a public URL that you can use to add your local server to ChatGPT in Settings > Connectors.

For example: `https://<custom_endpoint>.ngrok-free.app/mcp`

## Next steps

- Customize the widget data: edit the handlers in `pizzaz_server_node/src`, `pizzaz_server_python/main.py`, or the solar system server to fetch data from your systems.
- Create your own components and add them to the gallery: drop new entries into `src/` and they will be picked up automatically by the build script.

## Contributing

You are welcome to open issues or submit PRs to improve this app, however, please note that we may not review all suggestions.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
