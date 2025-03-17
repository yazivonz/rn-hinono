// listRoutes.js
const fs = require('fs');
const path = require('path');
const Table = require('cli-table3');
const colors = require('colors');

// Configure colors
colors.setTheme({
  get: 'green',
  post: 'yellow',
  put: 'blue',
  patch: 'cyan',
  delete: 'red',
  head: 'magenta',
  options: 'gray',
  title: 'white',
  route: 'white',
  param: 'cyan',
  middleware: 'gray'
});

console.log('\n' + '  API ROUTES'.bold.underline + '\n');

// Get files from routes directory
const routesDir = path.join(__dirname, 'routes');

try {
  if (!fs.existsSync(routesDir)) {
    console.log(`\n  Routes directory not found at: ${routesDir}`);
    return;
  }
  
  const files = fs.readdirSync(routesDir);
  
  if (files.length === 0) {
    console.log('\n  No route files found in the routes directory.');
    return;
  }
  
  // Group routes by file
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(routesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find all route definitions
      const routeRegex = /router\.(get|post|put|patch|delete)\(\s*['"]([^'"]+)['"](?:,\s*([^,)]+))*\s*(?:,\s*([^)]+))?\)/g;
      
      const routes = [];
      let match;
      
      while ((match = routeRegex.exec(content)) !== null) {
        const method = match[1];
        const path = match[2];
        const middlewares = match[3] ? [match[3]] : [];
        
        // Add additional middlewares if there are more
        if (match[4]) {
          // This is a simple approach - for complex middleware arrays, 
          // this would need more sophisticated parsing
          middlewares.push(match[4]);
        }
        
        routes.push({ method, path, middlewares });
      }
      
      if (routes.length > 0) {
        // Create route group title
        const groupName = file.replace('.js', '').toUpperCase();
        console.log(`  ${groupName}`.bold);
        
        // Create table for this route group
        const table = new Table({
          chars: {
            'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
            'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
            'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
            'right': '', 'right-mid': '', 'middle': ' '
          },
          style: { 'padding-left': 2, 'padding-right': 0 }
        });
        
        // Add routes to table
        routes.forEach(route => {
          const methodColor = route.method;
          const methodDisplay = route.method.toUpperCase().padEnd(7);
          
          // Format middleware info
          let middlewareInfo = '';
          if (route.middlewares.length > 0) {
            middlewareInfo = ` → ${route.middlewares.join(', ')}`.middleware;
          }
          
          table.push([
            methodDisplay[methodColor],
            route.path.route,
            middlewareInfo
          ]);
        });
        
        console.log(table.toString());
        console.log(''); // Add empty line between route groups
      }
    }
  });
  
} catch (error) {
  console.error('Error analyzing routes:', error.message);
}