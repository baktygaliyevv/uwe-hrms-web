# Horizon Restaurant Management System Web Client

## Prerequisites

Before you proceed with the setup, make sure you have the following prerequisites installed on your system:

- Node.js (v18 or later)
   - You can download Node.js from the [official website](https://nodejs.org/en)

## Instalation

1. Install Dependencies:
   - Open a terminal in the repository directory
   - Run the command `npm ci` to install all the necessary dependencies without altering `package-lock.json` file.

2. Build the Application:
   - Once the dependencies are installed, you can build the application running `npm run build`.
   - This command will compile TypeScript and other assets to create a production-ready build. 

3. Serving the Application:
   - The build proccess generates a `dist` directory containing the `index.html` file and all other assets.
   - These files should be served by a web server configured to rewrite all nested paths to the `index.html` file. This allows the React Router to handle the routing internally. 

