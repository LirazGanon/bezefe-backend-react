import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { Student } from './student.model';

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async insertStudent(
    _id: number,
    firstName: string,
    lastName: string,
    age: number,
    profession: string,
    classroom: string,
  ) {
    const newStudent = new this.studentModel({
      _id,
      firstName,
      lastName,
      age,
      profession,
      classroom,
    });
    const res = await newStudent.save();
    return res.id as number;
  }

  async getStudents() {
    let students: any[] = await this.studentModel.find().exec();
    if (!students || !students.length) {
      students = this.setDefaultStudents();
      this.studentModel.insertMany(students);
      // students.forEach((student) => async () => await student.save());
    }
    return students.map((student) => ({
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      profession: student.profession,
      classroom: student.classroom,
    }));
  }

  async getStudent(studentId: number) {
    const student = await this.findStudent(studentId);
    return {
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      profession: student.profession,
      classroom: student.classroom,
    };
  }

  async updateStudent(
    StudentId: number,
    StudentsFirstName: string,
    StudentLastName: string,
    StudentAge: number,
    StudentProfession: string,
    StudentClassroom: string,
  ) {
    const updateStudent = await this.findStudent(StudentId);

    if (StudentsFirstName) {
      updateStudent.firstName = StudentsFirstName;
    }
    if (StudentLastName) {
      updateStudent.lastName = StudentLastName;
    }
    if (StudentAge) {
      updateStudent.age = StudentAge;
    }
    if (StudentProfession) {
      updateStudent.profession = StudentProfession;
    }
    if (StudentClassroom) {
      updateStudent.classroom = StudentClassroom;
    }

    return updateStudent.save();
  }

  async deleteStudent(studentId: number) {
    const deletedStudent = await this.studentModel
      .deleteOne({ _id: studentId })
      .exec();

    return deletedStudent;
  }

  private async findStudent(studentId: number): Promise<Student> {
    let student: Student;
    try {
      student = await this.studentModel.findById(studentId).exec();
    } catch (err) {
      throw new NotFoundException(
        `Could not find student with Id: "${studentId}"`,
      );
    }
    if (!student)
      throw new NotFoundException(
        `Could not find student with Id: "${studentId}"`,
      );
    return student;
  }

  private setDefaultStudents() {
    return [
      {
        _id: 938475845,
        firstName: 'דוד',
        lastName: 'שימי',
        age: 65,
        profession: 'חשמליזציה',
        classroom: null,
      },
      {
        _id: 435476567,
        firstName: 'יוסי',
        lastName: 'בן יוסי',
        age: 99,
        profession: 'יוסאי',
        classroom: null,
      },
      {
        _id: 272727270,
        firstName: 'איימי',
        lastName: 'ויינהאוס',
        age: 27,
        profession: 'זמרת בכירה',
        classroom: null,
      },
      {
        _id: 435835540,
        firstName: 'עמוס',
        lastName: 'סומע',
        age: 100,
        profession: 'מורה רוחני',
        classroom: null,
      },
      {
        _id: 938465769,
        firstName: 'ריף',
        lastName: 'רף',
        age: 32,
        profession: 'מטקאי',
        classroom: null,
      },
    ];
  }
}
