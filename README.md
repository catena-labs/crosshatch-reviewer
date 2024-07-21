<h1 align="center">startkit-next</h1>

<div align="center">
  <strong>A sane way to start your next Next.js project</strong>
  <p>A type-safe starter project following the latest best practices</p>
</div>

## Features

- ✅ The latest **Next.js** (v15 rc)
- ✅ **Bun** package manager and test runner
- ✅ Insanely fast linting and code-style from **Biome**

## Installation

```sh
git clone git@github.com:startkit-dev/next.git <your-project-name>
```

Once cloned, you can run the setup script to get everything initialized:

```sh
bun run setup
```

## Usage

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Scripts

The project comes with some useful scripts.

```sh
bun check         - Perform a full check of the repo (lint, format, test, and type-check)
bun fix           - Fix any lint and formatting issues
bun lint          - Lint the repository
bun format:check  - Check the formatting of the repository
bun format        - Fix any formatting issues
bun run outdated  - Find any outdated packages
```
