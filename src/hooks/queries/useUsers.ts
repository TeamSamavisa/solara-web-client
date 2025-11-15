import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@/interfaces/user';
import type { UserQuery } from '@/interfaces/user/user-query';
import type { PaginatedResponse } from '@/interfaces/paginated-response';

const fetchUsers = (params?: UserQuery) =>
  api.get<PaginatedResponse<User>>('/api/user', { params });

export function useUsers(params?: UserQuery) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 2,
  });
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get('/api/auth/me');
      return data;
    },
  });
}

export function useUserById(id: number | null | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await api.get<User>(`/api/user/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
