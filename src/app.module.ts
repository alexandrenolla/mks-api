import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuarios/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        type: process.env.DB_TYPE as any,
        host: 'db',
        port: parseInt(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Constroi e atualiza as entidades automaticamente
      }
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // Logger para debugar a conexão com o db
    const logger = new Logger('TypeORM Configuration');
    logger.log({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    });
  }
}
