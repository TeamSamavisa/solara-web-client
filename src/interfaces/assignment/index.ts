import type { ClassGroup } from '../class-group';
import type { Schedule } from '../schedule';
import type { Space } from '../space';
import type { Subject } from '../subject';
import type { User } from '../user';

export interface Assignment {
  id: number;
  schedule_id: number;
  teacher_id: number;
  subject_id: number;
  space_id: number;
  class_group_id: number;
  schedule: Schedule;
  teacher: User;
  subject: Subject;
  space: Space;
  classGroup: ClassGroup;
}
