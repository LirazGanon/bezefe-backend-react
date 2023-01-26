import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { StudentScheme } from './student.model';
import { StudentService } from './student.service';
import { StudentsController } from './students.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentScheme }]),
  ],
  controllers: [StudentsController],
  providers: [StudentService],
})
export class StudentsModule {}
