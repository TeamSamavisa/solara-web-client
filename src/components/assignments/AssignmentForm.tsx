import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { Subject } from '@/interfaces/subject';
import type { Space } from '@/interfaces/space';
import type { Schedule } from '@/interfaces/schedule';
import type { User } from '@/interfaces/user';
import type { ClassGroup } from '@/interfaces/class-group';

interface AssignmentFormProps {
  isEditMode: boolean;
  formData: {
    teacher_id: number | null;
    subject_id: number | null;
    schedule_id: number | null;
    space_id: number | null;
    class_group_id: number | null;
  };
  subjects: Subject[];
  schedules: Schedule[];
  spaces: Space[];
  teachers: User[];
  classGroups: ClassGroup[];
  onSubmit: (e: React.FormEvent) => void;
  onSelectChange: (name: string, value: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const AssignmentForm = ({
  isEditMode,
  formData,
  subjects,
  schedules,
  spaces,
  teachers,
  classGroups,
  onSubmit,
  onSelectChange,
  onClose,
  isLoading,
}: AssignmentFormProps) => {
  const translateWeekDay = (weekday: string) => {
    const days: Record<string, string> = {
      monday: 'Segunda',
      tuesday: 'Terça',
      wednesday: 'Quarta',
      thursday: 'Quinta',
      friday: 'Sexta',
      saturday: 'Sábado',
      sunday: 'Domingo',
    };
    return days[weekday.toLowerCase()] || weekday;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? 'Editar Alocação' : 'Nova Alocação'}
        </DialogTitle>
        <DialogDescription>
          {isEditMode
            ? 'Edite os detalhes da alocação'
            : 'Preencha os dados para criar uma nova alocação'}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* Teacher */}
        <div className="grid gap-2">
          <Label htmlFor="teacher_id">Professor*</Label>
          <Select
            value={formData.teacher_id?.toString() || ''}
            onValueChange={(value) => onSelectChange('teacher_id', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um professor" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                  {teacher.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div className="grid gap-2">
          <Label htmlFor="subject_id">Disciplina*</Label>
          <Select
            value={formData.subject_id?.toString() || ''}
            onValueChange={(value) => onSelectChange('subject_id', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma disciplina" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule */}
        <div className="grid gap-2">
          <Label htmlFor="schedule_id">Horário*</Label>
          <Select
            value={formData.schedule_id?.toString() || ''}
            onValueChange={(value) => onSelectChange('schedule_id', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              {schedules.map((schedule) => (
                <SelectItem key={schedule.id} value={schedule.id.toString()}>
                  {translateWeekDay(schedule.weekday)}:{' '}
                  {schedule.start_time.slice(0, 5)} -{' '}
                  {schedule.end_time.slice(0, 5)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Space */}
        <div className="grid gap-2">
          <Label htmlFor="space_id">Espaço*</Label>
          <Select
            value={formData.space_id?.toString() || ''}
            onValueChange={(value) => onSelectChange('space_id', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um espaço" />
            </SelectTrigger>
            <SelectContent>
              {spaces.map((space) => (
                <SelectItem key={space.id} value={space.id.toString()}>
                  {space.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class Group */}
        <div className="grid gap-2">
          <Label htmlFor="class_group_id">Turma*</Label>
          <Select
            value={formData.class_group_id?.toString() || ''}
            onValueChange={(value) => onSelectChange('class_group_id', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              {classGroups.map((classGroup) => (
                <SelectItem
                  key={classGroup.id}
                  value={classGroup.id.toString()}
                >
                  {classGroup.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-red-900 hover:bg-red-800"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditMode ? 'Salvando...' : 'Criando...'}
            </>
          ) : isEditMode ? (
            'Salvar'
          ) : (
            'Criar'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
