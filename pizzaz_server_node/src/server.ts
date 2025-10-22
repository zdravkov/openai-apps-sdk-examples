import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { URL } from "node:url";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  type CallToolRequest,
  type ListResourceTemplatesRequest,
  type ListResourcesRequest,
  type ListToolsRequest,
  type ReadResourceRequest,
  type Resource,
  type ResourceTemplate,
  type Tool
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

type KendoWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  responseText: string;
};

function widgetMeta(widget: KendoWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": true,
    "openai/resultCanProduceWidget": true
  } as const;
}

const widgets: KendoWidget[] = [
  {
    id: "action-button",
    title: "Show Action Button",
    templateUri: "ui://widget/action-button.html",
    invoking: "Hand-tossing an action button",
    invoked: "Served a fresh action button",
    html: `
<div id="action-button-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">  
<link rel="stylesheet" href="http://localhost:4444/action-button.css">
<script type="module" src="http://localhost:4444/action-button.js"></script>
    `.trim(),
    responseText: "Rendered an action button!"
  },
 {
    id: "kendo-grid",
    title: "Show grid",
    templateUri: "ui://widget/grid.html",
    invoking: "Hand-tossing a grid",
    invoked: "Served a fresh grid",
    html: `
<div id="grid-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/grid.css">
<script type="module" src="http://localhost:4444/grid.js"></script>
    `.trim(),
    responseText: "Rendered a kendo grid!"
  },
   {
    id: "kendo-buttons",
    title: "Show  buttons",
    templateUri: "ui://widget/buttons.html",
    invoking: "Hand-tossing a buttons",
    invoked: "Served a fresh buttons",
    html: `
<div id="buttons-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css"> 
<link rel="stylesheet" href="http://localhost:4444/buttons.css">
<script type="module" src="http://localhost:4444/buttons.js"></script>
    `.trim(),
    responseText: "Rendered a kendo buttons!"
  },
  {
    id: "kendo-form",
    title: "Show  form",
    templateUri: "ui://widget/form.html",
    invoking: "Hand-tossing a form",
    invoked: "Served a fresh form",
    html: `
<div id="form-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/form.css">
<script type="module" src="http://localhost:4444/form.js"></script>
    `.trim(),
    responseText: "Rendered a kendo form!"
  },
    {
    id: "kendo-cards",
    title: "Show  cards",
    templateUri: "ui://widget/cards.html",
    invoking: "Hand-tossing a cards",
    invoked: "Served a fresh cards",
    html: `
<div id="cards-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/cards.css">
<script type="module" src="http://localhost:4444/cards.js"></script>
    `.trim(),
    responseText: "Rendered a kendo cards!"
  },
    {
    id: "kendo-dateinputs",
    title: "Show  dateinputs",
    templateUri: "ui://widget/dateinputs.html",
    invoking: "Hand-tossing a dateinputs",
    invoked: "Served a fresh dateinputs",
    html: `
<div id="dateinputs-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/dateinputs.css">
<script type="module" src="http://localhost:4444/dateinputs.js"></script>
    `.trim(),
    responseText: "Rendered a kendo dateinputs!"
  },
     {
    id: "kendo-dropdowns",
    title: "Show  dropdowns",
    templateUri: "ui://widget/dropdowns.html",
    invoking: "Hand-tossing a dropdowns",
    invoked: "Served a fresh dropdowns",
    html: `
<div id="dropdowns-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/dropdowns.css">
<script type="module" src="http://localhost:4444/dropdowns.js"></script>
    `.trim(),
    responseText: "Rendered a kendo dropdowns!"
  },
       {
    id: "kendo-loaders",
    title: "Show  loaders",
    templateUri: "ui://widget/loaders.html",
    invoking: "Hand-tossing a loaders",
    invoked: "Served a fresh loaders",
    html: `
<div id="loaders-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/loaders.css">
<script type="module" src="http://localhost:4444/loaders.js"></script>
    `.trim(),
    responseText: "Rendered a kendo loaders!"
  },
   {
    id: "kendo-dialogs",
    title: "Show  dialogs",
    templateUri: "ui://widget/dialogs.html",
    invoking: "Hand-tossing a dialogs",
    invoked: "Served a fresh dialogs",
    html: `
<div id="dialogs-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/dialogs.css">
<script type="module" src="http://localhost:4444/dialogs.js"></script>
    `.trim(),
    responseText: "Rendered a kendo dialogs!"
  },
   {
    id: "kendo-drawer",
    title: "Show  drawer",
    templateUri: "ui://widget/drawer.html",
    invoking: "Hand-tossing a drawer",
    invoked: "Served a fresh drawer",
    html: `
<div id="drawer-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/drawer.css">
<script type="module" src="http://localhost:4444/drawer.js"></script>
    `.trim(),
    responseText: "Rendered a kendo drawer!"
  },
     {
    id: "kendo-rating",
    title: "Show  rating",
    templateUri: "ui://widget/rating.html",
    invoking: "Hand-tossing a rating",
    invoked: "Served a fresh rating",
    html: `
<div id="rating-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/rating.css">
<script type="module" src="http://localhost:4444/rating.js"></script>
    `.trim(),
    responseText: "Rendered a kendo rating!"
  },
       {
    id: "kendo-result",
    title: "Show  result",
    templateUri: "ui://widget/result.html",
    invoking: "Hand-tossing a result",
    invoked: "Served a fresh result",
    html: `
<div id="result-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/result.css">
<script type="module" src="http://localhost:4444/result.js"></script>
    `.trim(),
    responseText: "Rendered a kendo result!"
  },
   {
    id: "kendo-header",
    title: "Show  header",
    templateUri: "ui://widget/header.html",
    invoking: "Hand-tossing a header",
    invoked: "Served a fresh header",
    html: `
<div id="header-root"></div>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/12.0.0/default/default-ocean-blue-a11y.css">
<link rel="stylesheet" href="http://localhost:4444/header.css">
<script type="module" src="http://localhost:4444/header.js"></script>
    `.trim(),
    responseText: "Rendered a kendo header!"
  }
];

const widgetsById = new Map<string, KendoWidget>();
const widgetsByUri = new Map<string, KendoWidget>();

widgets.forEach((widget) => {
  widgetsById.set(widget.id, widget);
  widgetsByUri.set(widget.templateUri, widget);
});

const toolInputSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Topping to mention when rendering the widget."
    },
    items: {
      type: "array",
      items: {
        type: "object"
      },
      description: "List of items to show in the Kendo Grid.",
      default: []
    },
    cards: {
      type: "array",
      items: {
        type: "object"
      },
      description: "List of cards to show with Kendo Cards. Each items should have a title, image (URL), description, and button text.",
      default: []
    },
    firstName: {
      type: "string",
      description: "First name of the user."
    },
    lastName: {
      type: "string",
      description: "Last name of the user."
    },
    email: {
      type: "string",
      description: "Email address of the user."
    },
    phone: {
      type: "string",
      description: "Phone number of the user."
    },
    purpose: {
      type: "array",
      items: {
        type: "string"
      },
      description: "List of purposes for contacting the user."
    }
  },
  required: ["title"],
  additionalProperties: false
} as const;

const toolInputParser = z.object({
  title: z.string(),
  items: z.array(z.any()).optional().default([]),
  cards: z.array(z.any()).optional().default([]),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  purpose: z.array(z.string()).optional().default([])
});

const tools: Tool[] = widgets.map((widget) => ({
  name: widget.id,
  description: widget.title,
  inputSchema: toolInputSchema,
  title: widget.title,
  _meta: widgetMeta(widget)
}));

const resources: Resource[] = widgets.map((widget) => ({
  uri: widget.templateUri,
  name: widget.title,
  description: `${widget.title} widget markup`,
  mimeType: "text/html+skybridge",
  _meta: widgetMeta(widget)
}));

const resourceTemplates: ResourceTemplate[] = widgets.map((widget) => ({
  uriTemplate: widget.templateUri,
  name: widget.title,
  description: `${widget.title} widget markup`,
  mimeType: "text/html+skybridge",
  _meta: widgetMeta(widget)
}));

function createPizzazServer(): Server {
  const server = new Server(
    {
      name: "pizzaz-node",
      version: "0.1.0"
    },
    {
      capabilities: {
        resources: {},
        tools: {}
      }
    }
  );

  server.setRequestHandler(ListResourcesRequestSchema, async (_request: ListResourcesRequest) => ({
    resources
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request: ReadResourceRequest) => {
    const widget = widgetsByUri.get(request.params.uri);

    if (!widget) {
      throw new Error(`Unknown resource: ${request.params.uri}`);
    }

    return {
      contents: [
        {
          uri: widget.templateUri,
          mimeType: "text/html+skybridge",
          text: widget.html,
          _meta: widgetMeta(widget)
        }
      ]
    };
  });

  server.setRequestHandler(ListResourceTemplatesRequestSchema, async (_request: ListResourceTemplatesRequest) => ({
    resourceTemplates
  }));

  server.setRequestHandler(ListToolsRequestSchema, async (_request: ListToolsRequest) => ({
    tools
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
    const widget = widgetsById.get(request.params.name);

    if (!widget) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    const args = toolInputParser.parse(request.params.arguments ?? {});

    switch (widget.id) {
      case "kendo-grid":
         return {
            content: [
              {
                type: "text",
                text: widget.responseText
              }
            ],
            structuredContent: {
              title: args.title,
              items: args.items
            },
            _meta: widgetMeta(widget)
          };
      case "kendo-cards":
         return {
            content: [
              {
                type: "text",
                text: widget.responseText
              }
            ],
            structuredContent: {
              title: args.title,
              cards: args.cards
            },
            _meta: widgetMeta(widget)
          };
      case "kendo-rating":
         return {
            content: [
              {
                type: "text",
                text: widget.responseText
              }
            ],
            structuredContent: {
              title: args.title
            },
            _meta: widgetMeta(widget)
          };
      case "kendo-result":
          return {
              content: [
                {
                  type: "text",
                  text: widget.responseText
                }
              ],
              structuredContent: {
                title: args.title,
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                phone: args.phone,
                purpose: args.purpose
              },
              _meta: widgetMeta(widget)
            };         
      case "action-button":
      case "kendo-buttons":
      case "kendo-form":

      case "kendo-dateinputs":
      case "kendo-dropdowns":
      case "kendo-loaders":
      case "kendo-dialogs":
      case "kendo-drawer":
      case "kendo-header":
        return {
          content: [
            {
              type: "text",
              text: widget.responseText
            }
          ],
          _meta: widgetMeta(widget)
        };
      default:
        throw new Error(`Unhandled tool: ${widget.id}`);
    }
  });

  return server;
}

type SessionRecord = {
  server: Server;
  transport: SSEServerTransport;
};

const sessions = new Map<string, SessionRecord>();

const ssePath = "/mcp";
const postPath = "/mcp/messages";

async function handleSseRequest(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const server = createPizzazServer();
  const transport = new SSEServerTransport(postPath, res);
  const sessionId = transport.sessionId;

  sessions.set(sessionId, { server, transport });

  transport.onclose = async () => {
    sessions.delete(sessionId);
    await server.close();
  };

  transport.onerror = (error) => {
    console.error("SSE transport error", error);
  };

  try {
    await server.connect(transport);
  } catch (error) {
    sessions.delete(sessionId);
    console.error("Failed to start SSE session", error);
    if (!res.headersSent) {
      res.writeHead(500).end("Failed to establish SSE connection");
    }
  }
}

async function handlePostMessage(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    res.writeHead(400).end("Missing sessionId query parameter");
    return;
  }

  const session = sessions.get(sessionId);

  if (!session) {
    res.writeHead(404).end("Unknown session");
    return;
  }

  try {
    await session.transport.handlePostMessage(req, res);
  } catch (error) {
    console.error("Failed to process message", error);
    if (!res.headersSent) {
      res.writeHead(500).end("Failed to process message");
    }
  }
}

const portEnv = Number(process.env.PORT ?? 8000);
const port = Number.isFinite(portEnv) ? portEnv : 8000;

const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && (url.pathname === ssePath || url.pathname === postPath)) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type"
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === ssePath) {
    await handleSseRequest(res);
    return;
  }

  if (req.method === "POST" && url.pathname === postPath) {
    await handlePostMessage(req, res, url);
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.on("clientError", (err: Error, socket) => {
  console.error("HTTP client error", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

httpServer.listen(port, () => {
  console.log(`Pizzaz MCP server listening on http://localhost:${port}`);
  console.log(`  SSE stream: GET http://localhost:${port}${ssePath}`);
  console.log(`  Message post endpoint: POST http://localhost:${port}${postPath}?sessionId=...`);
});
