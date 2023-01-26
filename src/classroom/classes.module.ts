import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ClassroomScheme } from './classroom.model';
import { ClassroomService } from './classroom.service';
import { ClassroomsController } from './classes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Classroom', schema: ClassroomScheme }]),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomService],
})
export class ClassesModule {}
