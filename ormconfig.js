require('dotenv/config');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const devConfig = [{
  name: 'default',
  type: process.env.DEFAULT_TYPE,
  host: process.env.DEFAULT_HOST,
  port: process.env.DEFAULT_PORT,
  username: process.env.DEFAULT_USERNAME,
  password: process.env.DEFAULT_PASSWORD,
  database: process.env.DEFAULT_DB_NAME,
  entities: [
    './src/modules/**/infra/typeorm/entities/*.ts'
  ],
  migrations: [
    './src/shared/infra/typeorm/migrations/*.ts'
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
}];

const prodConfig = [{
  name: 'default',
  type: process.env.DEFAULT_TYPE,
  host: process.env.DEFAULT_HOST,
  port: process.env.DEFAULT_PORT,
  username: process.env.DEFAULT_USERNAME,
  password: process.env.DEFAULT_PASSWORD,
  database: process.env.DEFAULT_DB_NAME,
  entities: [
    './dist/modules/**/infra/typeorm/entities/*.js'
  ],
  migrations: [
    './dist/shared/infra/typeorm/migrations/*.js'
  ],
  cli: {
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
}];

module.exports = process.env.NODE_ENV === 'dev' ? devConfig : prodConfig;
