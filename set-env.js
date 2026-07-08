const fs = require('fs');
const path = require('path');

// Ensure the directory exists
const envDir = path.join(__dirname, 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Define paths
const targetPath = path.join(envDir, 'environment.ts');

// Create the contents of the environment file dynamically
const envConfigFile = `export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY || ""}',
  apiUrl: '${process.env.API_URL || ""}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`Angular environment.ts file generated successfully.`);
