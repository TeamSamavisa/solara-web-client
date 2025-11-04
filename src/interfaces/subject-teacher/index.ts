import type { Subject } from "../subject";
import type { User } from "../user";

export interface SubjectTeacher {
  id: number;
  subject_id: number;
  teacher_id: number;
  subject: Subject;
  teacher: User;
}
