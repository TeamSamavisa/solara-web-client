import type { User } from "@/interfaces/user";
import type { CreateUser } from "@/interfaces/user/create-user";
import type { UpdateUser } from "@/interfaces/user/update-user";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createUser = (user: CreateUser) => api.post<User>("/api/user", user);

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateUser) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Sucesso", {
        description: "Professor(a) cadastrado(a) com sucesso",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Não foi possível criar o(a) professor(a). Tente novamente.";

      toast.error("Erro", {
        description: message,
      });
      console.error(error);
    },
  });
};

const updateUser = ({ id, ...data }: UpdateUser) =>
  api.patch<User>(`/api/user/${id}`, data);

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: UpdateUser) => updateUser(user),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });

      toast.success("Sucesso", {
        description: "Professor(a) atualizado(a) com sucesso",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Não foi possível atualizar o(a) professor(a). Tente novamente.";

      toast.error("Erro", {
        description: message,
      });
      console.error(error);
    },
  });
};

const deleteUser = (id: number) => api.delete(`/api/user/${id}`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["user", id] });

      toast.success("Sucesso", {
        description: "Professor(a) excluído(a) com sucesso",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Não foi possível excluir o(a) professor(a). Tente novamente.";

      toast.error("Erro", {
        description: message,
      });
      console.error(error);
    },
  });
};
