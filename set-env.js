const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, './src/environments/environment.ts');

// Format the file content with Vercel's environment variables
const envConfigFile = `export const environment = {
  production: true,
    supabaseUrl: '${process.env['API_URL']}',
    supabaseKey:'${process.env['API_KEY']}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log('Angular environment.ts file generated successfully.');
