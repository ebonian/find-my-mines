# Find My Mines

Netcentric Architecture's Term Project

## Getting Start

### Prerequisites

-   JavaScript Runtime: [Nodejs](https://nodejs.org/) or [NVM](https://github.com/nvm-sh/nvm)
-   Package Manager: [pnpm](https://pnpm.io/)
-   IDE: [VSCode](https://code.visualstudio.com/) with [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Local Development

> [!NOTE]
> Duplicate `.env.example` file and rename it to `.env`, remember to config any necessary environment variables

```bash
# Install dependencies
pnpm install

# Start development server for all apps (web & api)
pnpm dev

```

To run a specific app

```bash
# Start frontend server
pnpm dev --filter web

# Start backend server
pnpm dev --filter api
```

### Workspaces List

To access each application locally use `http://localhost:<network-port>`

| Workspace Name | Description                   | Network Port |
| -------------- | ----------------------------- | ------------ |
| `web`          | React Frontend with Nextjs    | 3000         |
| `api`          | Nodejs Backend with Expressjs | 3001         |

### Package Installation

```bash
# Install a package in a workspace
pnpm add <package> --filter <workspace>

# Remove a package from a workspace
pnpm uninstall <package> --filter <workspace>

# Upgrade a package in a workspace
pnpm update <package> --filter <workspace>
```

## Learn More

### Quick Tutorials

-   [React Foundation](https://nextjs.org/learn/react-foundations)
-   [Express.js w/ MongoDB Foundation](https://www.youtube.com/watch?v=fgTGADljAeg)
-   Tailwind CSS
    -   [https://www.youtube.com/watch?v=pfaSUYaSgRo](https://www.youtube.com/watch?v=pfaSUYaSgRo)
    -   [https://www.youtube.com/watch?v=Ksn1tThNTjI](https://www.youtube.com/watch?v=Ksn1tThNTjI)
