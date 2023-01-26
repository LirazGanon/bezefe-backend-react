import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';

@Controller('api/classes')
export class ClassroomsController {
  constructor(private classroomsService: ClassroomService) {}

  @Post()
  async addClassroom(
    @Body('_id') ClassroomId: string,
    @Body('name') ClassroomName: string,
    @Body('totalPlaces') ClassroomTotalPlaces: number,
    @Body('placeLeft') ClassroomPlaceLeft: number,
    @Body('students') ClassroomStudents: [],
  ) {
    const generatedId = await this.classroomsService.insertClassroom(
      ClassroomId,
      ClassroomName,
      ClassroomTotalPlaces,
      ClassroomPlaceLeft,
      ClassroomStudents,
    );
    return { id: generatedId };
  }

  @Get()
  getAllClassrooms() {
    return this.classroomsService.getClasses();
  }
  @Get(':ClassroomId')
  getClassroom(@Param('ClassroomId') ClassroomId: string) {
    return this.classroomsService.getClassroom(ClassroomId);
  }
  @Patch(':ClassroomId')
  updateClassroom(
    @Body('_id') ClassroomId: string,
    @Body('name') ClassroomName: string,
    @Body('totalPlaces') ClassroomTotalPlaces: number,
    @Body('placeLeft') ClassroomPlaceLeft: number,
    @Body('students') ClassroomStudents: [],
  ) {
    return this.classroomsService.updateClassroom(
      ClassroomId,
      ClassroomName,
      ClassroomTotalPlaces,
      ClassroomPlaceLeft,
      ClassroomStudents,
    );
  }

  @Delete(':ClassroomId')
  deleteClassroom(@Param('ClassroomId') ClassroomId: string) {
    return this.classroomsService.deleteClassroom(ClassroomId);
  }
}
