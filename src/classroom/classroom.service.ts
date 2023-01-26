import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { Classroom } from './classroom.model';
import { randomUUID } from 'crypto';

@Injectable()
export class ClassroomService {
  private classes: Classroom[] = [];

  constructor(
    @InjectModel('Classroom') private readonly classroomModel: Model<Classroom>,
  ) {}

  async insertClassroom(
    _id: string,
    name: string,
    totalPlaces: number,
    placeLeft: number,
    students: [],
  ) {
    const newClassroom = new this.classroomModel({
      _id,
      name,
      totalPlaces,
      placeLeft,
      students,
    });
    const res = await newClassroom.save();
    return res.id as string;
  }

  async getClasses() {
    let classes: any[] = await this.classroomModel.find().exec();
    if (!classes || !classes.length) {
      classes = this.setDefaultClasses();
      this.classroomModel.insertMany(classes);
      // classes.forEach((classroom) => async () => await classroom.save());
    }
    return classes.map((classroom) => ({
      _id: classroom._id,
      name: classroom.name,
      totalPlaces: classroom.totalPlaces,
      placeLeft: classroom.placeLeft,
      students: classroom.students,
    }));
  }

  async getClassroom(classroomId: string) {
    const classroom = await this.findClassroom(classroomId);
    return {
      _id: classroom._id,
      name: classroom.name,
      totalPlaces: classroom.totalPlaces,
      placeLeft: classroom.placeLeft,
      students: classroom.students,
    };
  }

  async updateClassroom(
    classroomId: string,
    name: string,
    totalPlaces: number,
    placeLeft: number,
    students: [],
  ) {
    const updateClassroom = await this.findClassroom(classroomId);

    if (name) {
      updateClassroom.name = name;
    }
    if (totalPlaces) {
      updateClassroom.totalPlaces = totalPlaces;
    }
    if (placeLeft) {
      updateClassroom.placeLeft = placeLeft;
    }
    if (students) {
      updateClassroom.students = students;
    }

    return updateClassroom.save();
  }

  async deleteClassroom(classroomId: string) {
    const deletedClassroom = await this.classroomModel
      .deleteOne({ _id: classroomId })
      .exec();

    return deletedClassroom;
  }

  private setDefaultClasses() {
    return [
      {
        _id: randomUUID(),
        name: 'אלון',
        totalPlaces: 2,
        placeLeft: 2,
        students: [],
      },
      {
        _id: randomUUID(),
        name: 'שקמה',
        totalPlaces: 11111,
        placeLeft: 11111,
        students: [],
      },
      {
        _id: randomUUID(),
        name: 'שיטה',
        totalPlaces: 96,
        placeLeft: 96,
        students: [],
      },
      {
        _id: randomUUID(),
        name: 'תאנה',
        totalPlaces: 45,
        placeLeft: 45,
        students: [],
      },
      {
        _id: randomUUID(),
        name: 'גפן',
        totalPlaces: 1,
        placeLeft: 1,
        students: [],
      },
      {
        _id: randomUUID(),
        name: 'ארזים',
        totalPlaces: 22,
        placeLeft: 22,
        students: [],
      },
    ];
  }

  private makeId(length: number = 5): string {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async findClassroom(classroomId: string): Promise<Classroom> {
    let classroom: Classroom;
    try {
      classroom = await this.classroomModel.findById(classroomId).exec();
    } catch (err) {
      throw new NotFoundException(
        `Could not find classroom with Id: "${classroomId}"`,
      );
    }
    if (!classroom)
      throw new NotFoundException(
        `Could not find classroom with Id: "${classroomId}"`,
      );
    return classroom;
  }
}
