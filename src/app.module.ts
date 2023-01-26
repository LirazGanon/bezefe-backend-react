import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classroom/classes.module';
import { StudentsModule } from './student/students.module';

@Module({
  imports: [
    ClassesModule,
    StudentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://test:test@cluster0.kigwn.mongodb.net/bezeferDB?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
