const { execSync } = require('child_process');
const path = require('path');

// Ensure dotenv is loaded
const serverPath = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(serverPath, '.env') });

async function resetClashRoyaleDatabase() {
  console.log('Starting Clash Royale database reset cron job...');
  try {
    console.log('Undoing all migrations (dropping tables)...');
    execSync('npx sequelize-cli db:migrate:undo:all', { cwd: serverPath, stdio: 'inherit' });
    
    console.log('Running migrations (creating tables)...');
    execSync('npx sequelize-cli db:migrate', { cwd: serverPath, stdio: 'inherit' });
    
    console.log('Running seeders (inserting default data)...');
    execSync('npx sequelize-cli db:seed:all', { cwd: serverPath, stdio: 'inherit' });
    
    console.log('Clash Royale database reset and seeded successfully!');
  } catch (error) {
    console.error('Error during Clash Royale database reset:', error.message);
  }
}

resetClashRoyaleDatabase();
