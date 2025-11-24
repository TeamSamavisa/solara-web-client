import { Link, useNavigate } from 'react-router';
import { Calendar, Return } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useOptimizeTimetable } from '@/hooks/mutations/mutationAssignments';
import { useLastTask } from '@/hooks/queries/useTasks';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const AssignmentGenerator = () => {
  const navigate = useNavigate();
  const { mutate: optimizeTimetable, isPending } = useOptimizeTimetable();
  const { data: lastTask } = useLastTask();

  useEffect(() => {}, [lastTask]);

  const isProcessing = isPending || lastTask?.status === 'PROCESSING';

  const handleOptimize = () => {
    optimizeTimetable();
  };

  const handleViewAssignments = () => {
    navigate('/assignments');
  };

  return (
    <MainLayout requireAdmin={false}>
      <div className="space-y-6">
        <div className="flex gap-6 items-center">
          <Link to="/assignments">
            <Return className="size-10 text-gray-100 dark:text-gray-200 hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="flex items-center gap-6 text-3xl font-bold text-gray-100 dark:text-gray-50 font-playwrite">
              <Calendar className="size-8" /> Otimização de Horários
            </h1>
            <p className="text-gray-50 dark:text-gray-300 mt-3">
              Gere alocações otimizadas automaticamente
            </p>
          </div>
        </div>

        {lastTask?.status === 'COMPLETED' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dark:bg-card dark:border-border">
              <CardHeader>
                <CardTitle className="dark:text-foreground">
                  Progresso
                </CardTitle>
                <CardDescription className="dark:text-muted-foreground">
                  Conclusão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                  {lastTask.progress}%
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-card dark:border-border">
              <CardHeader>
                <CardTitle className="dark:text-foreground">Status</CardTitle>
                <CardDescription className="dark:text-muted-foreground">
                  Otimização
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                  Completo ✓
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-card dark:border-border">
              <CardHeader>
                <CardTitle className="dark:text-foreground">ID</CardTitle>
                <CardDescription className="dark:text-muted-foreground">
                  Tarefa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--solara-800)] dark:text-primary">
                  #{lastTask.id}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm dark:shadow-lg border dark:border-border transition-colors">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle className="dark:text-foreground">
                Otimizador de Horários
              </CardTitle>
              <CardDescription className="dark:text-muted-foreground">
                Este processo irá alocar horários e salas às turmas baseado em
                requisitos e restrições
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lastTask?.status === 'COMPLETED' &&
                    'O último processo de otimização foi concluído com sucesso.'}
                  {lastTask?.status === 'PROCESSING' && (
                    <span className="flex items-center gap-2">
                      <span className="size-2 bg-blue-500 rounded-full animate-pulse" />
                      Gerando alocações otimizadas... {lastTask.progress}%
                    </span>
                  )}
                  {lastTask?.status === 'FAILED' && (
                    <span className="text-red-600 dark:text-red-400">
                      O último processo falhou: {lastTask.error_message}
                    </span>
                  )}
                  {!lastTask &&
                    'Clique no botão abaixo para iniciar o processo de otimização.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleOptimize}
                  disabled={isProcessing}
                  className={cn(
                    'bg-[var(--solara-800)] hover:bg-[var(--solara-700)] dark:bg-primary dark:hover:bg-primary/90',
                    isProcessing && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    'Iniciar Otimização'
                  )}
                </Button>

                {lastTask?.status === 'COMPLETED' && (
                  <Button
                    onClick={handleViewAssignments}
                    variant="outline"
                    className="dark:border-border dark:hover:bg-secondary"
                  >
                    Visualizar Alocações
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AssignmentGenerator;
