const path = require('path');
import { Sequelize } from 'sequelize';

// Create your DB connection
const sequelize: Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname,'..','..','test-database/', 'api-template.sqlite')
});

export default sequelize;

/**
 * In this case, we use sqlite, but it can change on the DB you are going to use
 * npm install --save pg pg-hstore # Postgres
 * npm install --save mysql2 #MySQL
 * npm install --save mariadb #MariaDB
 * npm install --save sqlite3 #SQLite - USED IN THIS EXAMPLE
 * npm install --save tedious # Microsoft SQL Server
 */