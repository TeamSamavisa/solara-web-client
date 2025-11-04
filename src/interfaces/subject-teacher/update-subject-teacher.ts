import type { CreateSubjectTeacher } from "./create-subject-teacher";

export interface UpdateSubjectTeacher extends Partial<CreateSubjectTeacher> {
  id: number;
}
