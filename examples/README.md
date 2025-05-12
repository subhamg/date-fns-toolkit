# date-fns-toolkit Examples

This directory contains examples demonstrating how to use date-fns-toolkit in different environments.

## Examples Overview

1. **all-in-one-usage.js**
   - Basic example showing core functionality
   - Demonstrates importing various functions from the package

2. **react-app-example.jsx**
   - Complete React application example
   - Shows how to use React-specific hooks and components
   - Demonstrates timezone context and UI integration

3. **nodejs-server-example.js**
   - Express.js server example
   - Shows how to use the library in a Node.js backend
   - Demonstrates timezone-aware API endpoints

4. **enhanced-features-example.js**
   - Showcases the enhanced features added to the library
   - Demonstrates automatic timezone detection
   - Shows date range functions and calendar generation
   - Includes relative time formatting examples

## Running the Examples

### React Example

To run the React example, you can create a new React app and copy the example code:

```bash
# Create a new React app
npx create-react-app date-fns-toolkit-demo

# Install dependencies
cd date-fns-toolkit-demo
npm install date-fns-toolkit

# Copy the example code to App.js
# Then start the development server
npm start
```

### Node.js Server Example

To run the Node.js server example:

```bash
# Create a new directory
mkdir date-fns-toolkit-server
cd date-fns-toolkit-server

# Initialize a new Node.js project
npm init -y

# Install dependencies
npm install express date-fns-toolkit

# Copy the example code to index.js
# Then start the server
node index.js
```

## Key Features Demonstrated

- Global timezone configuration
- React hooks and components for timezone management
- Timezone-aware date formatting and parsing
- Date arithmetic respecting timezones
- Date comparison with timezone awareness
- Converting dates between timezones 