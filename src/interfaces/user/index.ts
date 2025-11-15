import type { Assignment } from '../assignment';
import type { ScheduleTeacher } from '../schedule-teacher';
import type { SubjectTeacher } from '../subject-teacher';

export interface User {
  id: number;
  full_name: string;
  registration: string;
  email: string;
  role: string;
  subjectTeachers?: SubjectTeacher[];
  scheduleTeachers?: ScheduleTeacher[];
  assignments?: Assignment[];
}
