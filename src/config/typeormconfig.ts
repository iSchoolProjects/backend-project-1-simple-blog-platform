import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({ isGlobal: true });

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./dist/entity/*/*.entity.js'],
  migrations: ['./dist/migration/.js'],
  cli: {
    migrationsDir: './src/migration',
  },
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default typeOrmConfig;
