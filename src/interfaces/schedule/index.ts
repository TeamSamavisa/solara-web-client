import type { Assignment } from '../assignment';
import type { ScheduleTeacher } from '../schedule-teacher';

export interface Schedule {
  id: number;
  weekday: string;
  start_time: string;
  end_time: string;
  scheduleTeachers?: ScheduleTeacher[];
  assignments?: Assignment[];
}
