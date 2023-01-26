import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('api/students')
export class StudentsController {
  constructor(private studentsService: StudentService) {}

  @Post()
  async addStudent(
    @Body('_id') StudentId: number,
    @Body('firstName') StudentFirstName: string,
    @Body('lastName') StudentLastName: string,
    @Body('age') StudentAge: number,
    @Body('profession') StudentProfession: string,
    @Body('classroom') StudentClassroom: string,
  ) {
    const generatedId = await this.studentsService.insertStudent(
      StudentId,
      StudentFirstName,
      StudentLastName,
      StudentAge,
      StudentProfession,
      StudentClassroom,
    );
    return { id: generatedId };
  }

  @Get()
  getAllStudents() {
    return this.studentsService.getStudents();
  }
  @Get(':StudentId')
  getStudent(@Param('StudentId') StudentId: number) {
    return this.studentsService.getStudent(StudentId);
  }
  @Patch(':StudentId')
  updateStudent(
    @Body('_id') StudentId: number,
    @Body('firstName') StudentsFirstName: string,
    @Body('lastName') StudentLastName: string,
    @Body('age') StudentAge: number,
    @Body('profession') StudentProfession: string,
    @Body('classroom') StudentClassroom: string,
  ) {
    return this.studentsService.updateStudent(
      StudentId,
      StudentsFirstName,
      StudentLastName,
      StudentAge,
      StudentProfession,
      StudentClassroom,
    );
  }

  @Delete(':StudentId')
  deleteStudent(@Param('StudentId') StudentId: number) {
    return this.studentsService.deleteStudent(StudentId);
  }
}
