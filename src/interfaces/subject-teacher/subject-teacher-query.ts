import type { BaseQuery } from '../base-query';

export interface SubjectTeacherQuery extends BaseQuery {
  subject_id?: number;
  teacher_id?: number;
}
