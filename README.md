<div align="left" style="position: relative;">

<h1>MATERIAL-PARA-DESARROLLADORES</h1>
<p align="left">
	<em><code>❯ An app to manage personal pages filtered by categories</code></em>
</p>
<p align="left">Built with the tools and technologies:</p>
<p align="left">
	<a href="https://skillicons.dev">
		<img src="https://skillicons.dev/icons?i=bootstrap,css,html,react,vite">
	</a></p>
</div>
<br clear="right">

<details><summary>Table of Contents</summary>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

</details>
<hr>

##  Overview

Material para Desarrolladores es una aplicación web para gestionar y descubrir páginas y recursos útiles organizados por categorías. Permite a los usuarios guardar, filtrar y explorar enlaces de valor para el desarrollo profesional y personal, todo desde una interfaz moderna y responsiva.

---

##  Features

- Organize and discover valuable web resources by customizable categories.
- User authentication and role-based access (admin/user).
- Save, filter, and manage personal and public links.
- Responsive dashboard with modern UI and Bootstrap styling.
- Dark mode toggle with persistent user preference and system theme detection.
- Fast navigation and real-time updates using React and Vite.
- Secure backend integration with Supabase.
- Accessible design for desktop and mobile devices.

---

##  Project Structure

```sh
└── material-para-desarrolladores/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── 1737644497741.jpeg
    │   ├── 1739831880360.jpeg
    │   ├── _redirects
    │   ├── logo.svg
    │   ├── team.jpg
    │   └── vite.svg
    ├── src
    │   ├── App.tsx
    │   ├── components
    │   ├── context
    │   ├── main.tsx
    │   ├── pages
    │   ├── styles
    │   ├── types
    │   ├── utils
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```


###  Project Index
<details open>
	<summary><b><code>MATERIAL-PARA-DESARROLLADORES/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/tsconfig.node.json'>tsconfig.node.json</a></b></td>
				<td>TypeScript configuration for Node-specific build and tooling. Used to define compiler options and include files for server-side or build scripts.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td>Auto-generated lockfile that records the exact versions of every installed npm dependency. Ensures consistent installs across environments.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td>Root TypeScript configuration file. References both app and node configs and sets global compiler options for the project.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/tsconfig.app.json'>tsconfig.app.json</a></b></td>
				<td>TypeScript configuration for the main application source code. Enables strict type-checking and modern JS features for the <code>src/</code> directory.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/package.json'>package.json</a></b></td>
				<td>Project manifest for npm. Specifies metadata, scripts, dependencies, and devDependencies for building and running the app.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/vite.config.ts'>vite.config.ts</a></b></td>
				<td>Configuration file for Vite, the frontend build tool. Sets up plugins, build options, and development server settings for the React app.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/index.html'>index.html</a></b></td>
				<td>Main HTML entry point for the app. Loads the React root, sets up meta tags, and links to static assets and the main bundle.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/eslint.config.js'>eslint.config.js</a></b></td>
				<td>ESLint configuration for code linting and quality checks. Integrates TypeScript, React, and custom rules for consistent code style.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/main.tsx'>main.tsx</a></b></td>
				<td>Entry point for ReactDOM rendering. Wraps the app in authentication context and imports global styles.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/App.tsx'>App.tsx</a></b></td>
				<td>Main React application component. Sets up routing and global layout (header, footer, and page routes).</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/vite-env.d.ts'>vite-env.d.ts</a></b></td>
				<td>TypeScript type declarations for Vite environment variables and global types.</td>
			</tr>
			</table>
			<details>
				<summary><b>types</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/types/index.ts'>index.ts</a></b></td>
						<td>TypeScript interfaces for core domain models (Category, Page, User) used across the app.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>context</b></summary>
				<summary><b>styles</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/styles/dashboard.css'>dashboard.css</a></b></td>
						<td>Global CSS styles and variables for the dashboard layout and application UI.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/DashboardLayout.tsx'>DashboardLayout.tsx</a></b></td>
						<td>Layout and logic for displaying, filtering, and managing pages and categories in the dashboard.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/Footer.tsx'>Footer.tsx</a></b></td>
						<td>Footer component for the application layout.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/DashboardLayout.css'>DashboardLayout.css</a></b></td>
						<td>CSS styles for the dashboard layout and components.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/UserPagesManager.tsx'>UserPagesManager.tsx</a></b></td>
						<td>Component for managing user-specific saved pages and resources.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/FetchCategories.tsx'>FetchCategories.tsx</a></b></td>
						<td>Component for fetching and rendering categories.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/Header.tsx'>Header.tsx</a></b></td>
						<td>Responsive navigation bar with links, user authentication controls, and dark mode toggle.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/PublicPagesManager.tsx'>PublicPagesManager.tsx</a></b></td>
						<td>Component to browse, filter, and manage public/shared resource links.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/UsersList.tsx'>UsersList.tsx</a></b></td>
						<td>Admin-only component to view and manage registered users.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/AdminRoute.tsx'>AdminRoute.tsx</a></b></td>
						<td>Route guard component that restricts access to admin-only routes.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/GroupedPagesList.tsx'>GroupedPagesList.tsx</a></b></td>
						<td>Component to display resource links grouped by category.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/components/CategoriesManager.tsx'>CategoriesManager.tsx</a></b></td>
						<td>Component for creating, editing, and deleting resource categories.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>pages</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/Dashboard.jsx'>Dashboard.jsx</a></b></td>
						<td>Legacy dashboard implementation for managing and viewing resource links.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/Login.tsx'>Login.tsx</a></b></td>
						<td>Login form for user authentication, with validation and Supabase integration.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/ForgotPassword.tsx'>ForgotPassword.tsx</a></b></td>
						<td>Placeholder for password recovery; currently shows a WIP component.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/WIP.tsx'>WIP.tsx</a></b></td>
						<td>Work-in-progress placeholder page for features under development.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/Home.tsx'>Home.tsx</a></b></td>
						<td>Landing page with app introduction and call-to-action for new users.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/AboutUs.tsx'>AboutUs.tsx</a></b></td>
						<td>Information page about the project, its goals, and contributors.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/Register.tsx'>Register.tsx</a></b></td>
						<td>User registration form for creating new accounts.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/Dashboard.new.tsx'>Dashboard.new.tsx</a></b></td>
						<td>Experimental or new version of the dashboard interface.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/pages/Dashboard.tsx'>Dashboard.tsx</a></b></td>
						<td>Main dashboard page for managing and browsing categorized links.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>context</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/context/AuthContext.tsx'>AuthContext.tsx</a></b></td>
						<td>React context provider for authentication state, user roles, and session management.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>utils</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/src/utils/supabase.ts'>supabase.ts</a></b></td>
						<td>Initializes and exports the Supabase client for database and authentication operations.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- public Submodule -->
		<summary><b>public</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/fergone03/material-para-desarrolladores/blob/master/public/_redirects'>_redirects</a></b></td>
				<td>Netlify redirects configuration file for custom route handling and SPA support.</td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with material-para-desarrolladores, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Framework:** React, Vite, Supabase, Bootstrap
- **Package Manager:** Npm


###  Installation

Install material-para-desarrolladores using one of the following methods:

**Build from source:**

1. Clone the material-para-desarrolladores repository:
```sh
❯ git clone https://github.com/fergone03/material-para-desarrolladores
```

2. Navigate to the project directory:
```sh
❯ cd material-para-desarrolladores
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run material-para-desarrolladores using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run dev
```


---
##  Project Roadmap

- [X] **`Task 1`**: <strike>Dark mode</strike>
- [X] **`Task 2`**: <strike>Styling rework</strike>
- [ ] **`Task 3`**: English language selector.

---

##  Contributing

- **💬 [Send us an email](mpdesarrolladores@gmail.com)**: This way we can analyze your ideas and links and discuss if they are relevant to add to the public pages! mpdesarrolladores@gmail.com
<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/fergone03/material-para-desarrolladores/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=fergone03/material-para-desarrolladores">
   </a>
</p>
</details>

