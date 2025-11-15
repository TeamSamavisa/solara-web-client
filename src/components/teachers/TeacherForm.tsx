import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TeacherFormProps {
  isEditMode: boolean;
  formData: {
    registration?: string;
    full_name: string;
    email: string;
    password?: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting?: boolean;
  className?: string;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({
  isEditMode,
  formData,
  onSubmit,
  onChange,
  isSubmitting = false,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={cn('grid items-start gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="registration" className="dark:text-foreground">
          Registro Funcional
        </Label>
        <Input
          id="registration"
          name="registration"
          value={formData.registration || ''}
          onChange={onChange}
          placeholder="Ex: RF123456"
          className="dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="full_name" className="dark:text-foreground">
          Nome Completo *
        </Label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={onChange}
          placeholder="Ex: João da Silva"
          required
          className="dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="dark:text-foreground">
          Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Ex: professor@escola.edu"
          required
          className="dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
        />
      </div>
      {!isEditMode && (
        <div className="grid gap-2">
          <Label htmlFor="password" className="dark:text-foreground">
            Senha *
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password || ''}
            onChange={onChange}
            placeholder="Digite uma senha"
            required={!isEditMode}
            minLength={6}
            className="dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
          />
        </div>
      )}
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
    </form>
  );
};
