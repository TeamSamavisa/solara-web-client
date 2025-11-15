import type { Assignment } from '../assignment';
import type { Course } from '../course';
import type { SpaceType } from '../space-type';
import type { SubjectTeacher } from '../subject-teacher';

export interface Subject {
  id: number;
  name: string;
  required_space_type_id: number;
  course_id: number;
  requiredSpaceType: SpaceType;
  course: Course;
  subjectTeachers?: SubjectTeacher[];
  assignments?: Assignment[];
}
