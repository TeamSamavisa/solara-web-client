import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ScheduleFormProps {
  isEditMode: boolean;
  formData: {
    weekday: string;
    start_time: string;
    end_time: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onSelectChange: (name: string, value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting?: boolean;
  className?: string;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isEditMode,
  formData,
  onSubmit,
  onSelectChange,
  onChange,
  isSubmitting = false,
  className,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('grid items-start gap-4', className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="weekday" className="dark:text-foreground">
          Dia da Semana *
        </Label>
        <Select
          value={formData.weekday || ''}
          onValueChange={(value) => onSelectChange('weekday', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Segunda">Segunda</SelectItem>
            <SelectItem value="Terça">Terça</SelectItem>
            <SelectItem value="Quarta">Quarta</SelectItem>
            <SelectItem value="Quinta">Quinta</SelectItem>
            <SelectItem value="Sexta">Sexta</SelectItem>
            <SelectItem value="Sábado">Sábado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="start_time" className="dark:text-foreground">
          Hora de início *
        </Label>
        <Input
          id="start_time"
          name="start_time"
          value={formData.start_time || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            let formatted = value;

            if (value.length >= 2) {
              formatted = value.slice(0, 2) + ':' + value.slice(2, 4);
            }

            onChange({
              ...e,
              target: {
                ...e.target,
                name: 'start_time',
                value: formatted
              }
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          placeholder="HH:MM"
          required
          className="dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="end_time" className="dark:text-foreground">
          Hora de término *
        </Label>
        <Input
          id="end_time"
          name="end_time"
          value={formData.end_time || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            let formatted = value;

            if (value.length >= 2) {
              formatted = value.slice(0, 2) + ':' + value.slice(2, 4);
            }
            
            onChange({
              ...e,
              target: {
                ...e.target,
                name: 'end_time',
                value: formatted
              }
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          placeholder="HH:MM"
          required
          className="dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-2">
        <Button
          type="submit"
          className="bg-[var(--solara-800)] hover:bg-[var(--solara-700)] dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Salvando...'
            : isEditMode
              ? 'Atualizar'
              : 'Adicionar'}
        </Button>
      </div>
    </form >
  );
};
