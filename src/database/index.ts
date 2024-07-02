import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize('my_blog_database', 'my_blog_user', 'my_secure_password', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;