import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classroom/classes.module';
import { StudentsModule } from './student/students.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ClassesModule,
    StudentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://test:test@cluster0.kigwn.mongodb.net/bezeferDB?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
