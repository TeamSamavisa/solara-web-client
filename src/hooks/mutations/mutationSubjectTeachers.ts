/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SubjectTeacher } from '@/interfaces/subject-teacher';
import type { CreateSubjectTeacher } from '@/interfaces/subject-teacher/create-subject-teacher';
import type { UpdateSubjectTeacher } from '@/interfaces/subject-teacher/update-subject-teacher';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createSubjectTeacher = (subjectTeacher: CreateSubjectTeacher) =>
  api.post<SubjectTeacher>('/api/subject-teacher', subjectTeacher);

export const useCreateSubjectTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subjectTeacher: CreateSubjectTeacher) =>
      createSubjectTeacher(subjectTeacher),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subject-teachers'] });
      toast.success('Sucesso', {
        description:
          'Associação entre professor e disciplina cadastrada com sucesso',
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Não foi possível criar a associação entre professor e disciplina. Tente novamente.';

      toast.error('Erro', {
        description: message,
      });
      console.error(error);
    },
  });
};

const updateSubjectTeacher = ({ id, ...data }: UpdateSubjectTeacher) =>
  api.patch<SubjectTeacher>(`/api/subject-teacher/${id}`, data);

export const useUpdateSubjectTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subjectTeacher: UpdateSubjectTeacher) =>
      updateSubjectTeacher(subjectTeacher),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subject-teachers'] });
      queryClient.invalidateQueries({
        queryKey: ['subject-teacher', variables.id],
      });

      toast.success('Sucesso', {
        description:
          'Associação entre professor e disciplina atualizada com sucesso',
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Não foi possível atualizar a associação entre professor e disciplina. Tente novamente.';

      toast.error('Erro', {
        description: message,
      });
      console.error(error);
    },
  });
};

const deleteSubjectTeacher = (id: number) =>
  api.delete(`/api/subject-teacher/${id}`);

export const useDeleteSubjectTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSubjectTeacher(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['subject-teachers'] });
      queryClient.removeQueries({ queryKey: ['subject-teacher', id] });

      toast.success('Sucesso', {
        description:
          'Associação entre professor e disciplina excluída com sucesso',
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Não foi possível excluir a associação entre professor e disciplina. Tente novamente.';

      toast.error('Erro', {
        description: message,
      });
      console.error(error);
    },
  });
};
