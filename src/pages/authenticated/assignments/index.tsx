import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Calendar, Return } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useRole } from '@/hooks/useRole';
import { AssignmentFilters } from '@/components/assignments/AssignmentFilters';
import { AssignmentsList } from '@/components/assignments/AssignmentsList';
import { AssignmentsPagination } from '@/components/assignments/AssignmentsPagination';
import { AssignmentForm } from '@/components/assignments/AssignmentForm';
import { useAssignments } from '@/hooks/queries/useAssignments';
import { useSubjects } from '@/hooks/queries/useSubjects';
import { useSchedules } from '@/hooks/queries/useSchedules';
import { useSpaces } from '@/hooks/queries/useSpaces';
import { useUsers } from '@/hooks/queries/useUsers';
import { useClassGroups } from '@/hooks/queries/useClassGroups';
import {
  useCreateAssignment,
  useUpdateAssignment,
  useDeleteAssignment,
} from '@/hooks/mutations/mutationAssignments';
import type {
  Assignment,
  AssignmentQuery,
  CreateAssignment,
} from '@/interfaces/assignment';

const INITIAL_FORM_DATA: {
  teacher_id: number | null;
  subject_id: number | null;
  schedule_id: number | null;
  space_id: number | null;
  class_group_id: number | null;
} = {
  teacher_id: null,
  subject_id: null,
  schedule_id: null,
  space_id: null,
  class_group_id: null,
};

const Assignments = () => {
  const navigate = useNavigate();
  const { hasRole, isAdmin } = useRole();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [formData, setFormData] =
    useState<typeof INITIAL_FORM_DATA>(INITIAL_FORM_DATA);

  // Filters and pagination
  const [filters, setFilters] = useState<AssignmentQuery>({
    page: 1,
    limit: 10,
  });

  // debounce for the filters
  const [debouncedFilters, setDebouncedFilters] =
    useState<AssignmentQuery>(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  // Queries and mutations
  const { data: assignmentsData, isLoading } = useAssignments(debouncedFilters);
  const { data: subjectsData } = useSubjects({ limit: 10 });
  const { data: schedulesData } = useSchedules({ limit: 10 });
  const { data: spacesData } = useSpaces({ limit: 10 });
  const { data: teachersData } = useUsers({ limit: 10 });
  const { data: classGroupsData } = useClassGroups({ limit: 10 });

  const createMutation = useCreateAssignment();
  const updateMutation = useUpdateAssignment();
  const deleteMutation = useDeleteAssignment();

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev: AssignmentQuery) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev: AssignmentQuery) => ({
      ...prev,
      page,
    }));
  };

  const handleNavigateToOptimize = () => {
    navigate('/assignments/generate');
  };

  const handleOpenDialog = () => {
    setIsEditMode(false);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData(INITIAL_FORM_DATA);
    setSelectedAssignment(null);
  };

  const handleEdit = (assignment: Assignment) => {
    setIsEditMode(true);
    setSelectedAssignment(assignment);
    setFormData({
      teacher_id: assignment.teacher_id,
      subject_id: assignment.subject_id,
      schedule_id: assignment.schedule_id,
      space_id: assignment.space_id,
      class_group_id: assignment.class_group_id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedAssignment) return;
    deleteMutation.mutate(selectedAssignment.id);
    setIsDeleteDialogOpen(false);
    setSelectedAssignment(null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.teacher_id ||
      !formData.subject_id ||
      !formData.schedule_id ||
      !formData.space_id ||
      !formData.class_group_id
    ) {
      return;
    }

    const assignmentData: CreateAssignment = {
      teacher_id: formData.teacher_id,
      subject_id: formData.subject_id,
      schedule_id: formData.schedule_id,
      space_id: formData.space_id,
      class_group_id: formData.class_group_id,
    };

    if (isEditMode && selectedAssignment) {
      updateMutation.mutate(
        { id: selectedAssignment.id, ...assignmentData },
        {
          onSuccess: () => {
            handleCloseDialog();
          },
        },
      );
    } else {
      createMutation.mutate(assignmentData, {
        onSuccess: () => {
          handleCloseDialog();
        },
      });
    }
  };

  return (
    <MainLayout requireAdmin={false}>
      <div className="space-y-6">
        <div className="flex gap-6 items-center justify-between">
          <div className="flex gap-6 items-center">
            <Link to="/dashboard">
              <Return className="size-10 text-gray-100 dark:text-gray-200 hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="flex items-center gap-6 text-3xl font-bold text-gray-100 dark:text-gray-50 font-playwrite">
                <Calendar className="size-8" /> Alocações
              </h1>
              <p className="text-gray-50 dark:text-gray-300 mt-3">
                Gerenciar alocações de horários
              </p>
            </div>
          </div>

          {hasRole('principal') && (
            <Button
              onClick={handleNavigateToOptimize}
              className="bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
            >
              Otimizar Automaticamente
            </Button>
          )}
        </div>

        <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm dark:shadow-lg border dark:border-border transition-colors">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center mb-4 lg:justify-between">
            <AssignmentFilters
              filters={{
                teacherName: '',
                subjectName: '',
                className: '',
              }}
              onFilterChange={handleFilterChange}
            />

            <div className="flex items-center justify-between lg:justify-start gap-4 w-full lg:w-auto">
              {isAdmin && (
                <Button
                  onClick={handleOpenDialog}
                  className="bg-[var(--solara-800)] hover:bg-[var(--solara-700)] dark:bg-primary dark:hover:bg-primary/90 transition-colors"
                >
                  Nova Alocação
                </Button>
              )}
            </div>
          </div>

          <AssignmentsList
            assignments={assignmentsData?.content || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />

          {assignmentsData && (
            <AssignmentsPagination
              currentPage={assignmentsData.pagination.currentPage}
              totalPages={assignmentsData.pagination.totalPages}
              totalItems={assignmentsData.pagination.totalItems}
              itemsPerPage={assignmentsData.pagination.itemsPerPage}
              hasNextPage={assignmentsData.pagination.hasNextPage}
              hasPrevPage={assignmentsData.pagination.hasPrevPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* form dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="dark:bg-card dark:border-border max-h-[90vh] overflow-y-auto">
          <AssignmentForm
            isEditMode={isEditMode}
            formData={formData}
            subjects={subjectsData?.content || []}
            schedules={schedulesData?.content || []}
            spaces={spacesData?.content || []}
            teachers={teachersData?.content || []}
            classGroups={classGroupsData?.content || []}
            onSubmit={handleSubmit}
            onSelectChange={handleSelectChange}
            onClose={handleCloseDialog}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* deletion confirmation dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="dark:bg-card dark:border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-foreground">
              Confirmar exclusão
            </AlertDialogTitle>
            <AlertDialogDescription className="dark:text-muted-foreground">
              Tem certeza que deseja excluir esta alocação? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/80 transition-colors"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Assignments;
