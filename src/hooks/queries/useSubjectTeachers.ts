import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { SubjectTeacher } from "@/interfaces/subject-teacher";
import type { SubjectTeacherQuery } from "@/interfaces/subject-teacher/subject-teacher-query";
import type { PaginatedResponse } from "@/interfaces/paginated-response";

const fetchSubjectTeachers = (params?: SubjectTeacherQuery) =>
  api.get<PaginatedResponse<SubjectTeacher>>("/api/subject-teacher", {
    params,
  });

export function useSubjectTeachers(params?: SubjectTeacherQuery) {
  return useQuery({
    queryKey: ["subject-teachers", params],
    queryFn: () => fetchSubjectTeachers(params),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 2,
  });
}

export function useSubjectTeacherById(id: number | null | undefined) {
  return useQuery({
    queryKey: ["subject-teacher", id],
    queryFn: async () => {
      const { data } = await api.get<SubjectTeacher>(
        `/api/subject-teacher/${id}`,
      );
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
