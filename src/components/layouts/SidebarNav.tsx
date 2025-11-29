import { Link, useLocation } from 'react-router';
import { Home, User, Logout, Users, Calendar } from '@/assets/icons';
import { useAuth } from '@/contexts/auth';
import { useRecentActions } from '@/hooks/useRecentActions';
import { useRole } from '@/hooks/useRole';
import { cn } from '@/lib/utils';
import solara from '@/assets/images/solara.png';
import { ThemeToggle } from '@/components/ui/theme-toggle';

type NavItemProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const NavItem = ({ to, label, icon }: NavItemProps) => {
  const location = useLocation();
  const { addRecentAction } = useRecentActions();
  const isActive = location.pathname === to;

  const handleClick = () => {
    addRecentAction(to);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(
        'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
        isActive
          ? 'bg-[var(--solara-100)] dark:bg-sidebar-accent text-[var(--solara-900)] dark:text-sidebar-accent-foreground font-medium'
          : 'text-gray-600 dark:text-sidebar-foreground hover:text-[var(--solara-900)] dark:hover:text-sidebar-primary hover:bg-[var(--solara-50)] dark:hover:bg-sidebar-accent/50',
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
};

export function SidebarNav() {
  const { signOut } = useAuth();
  const { hasRole, isAdmin } = useRole();

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border p-4 flex flex-col overflow-y-auto">
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="flex flex-col items-center gap-3 group"
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full transform group-hover:scale-105 transition-transform duration-300" />
            <img
              src={solara}
              alt="Solara Logo"
              className="relative w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-[var(--solara-600)] dark:text-[var(--solara-50)] font-playwrite">
              Solara
            </span>
          </div>
        </Link>
      </div>

      <nav className="space-y-1">
        <NavItem
          to="/dashboard"
          label="Início"
          icon={<Home className="size-4" />}
        />
      </nav>

      {/* management section - coordinator and above */}
      {hasRole('coordinator') && (
        <>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Gestão
            </p>
          </div>
          <nav className="space-y-1">
            <NavItem
              to="/teachers"
              label="Professores"
              icon={<Users className="size-4" />}
            />
            <NavItem
              to="/space_types"
              label="Tipos de Espaços"
              icon={<Calendar className="size-4" />}
            />
            <NavItem
              to="/spaces"
              label="Espaços"
              icon={<Calendar className="size-4" />}
            />
            <NavItem
              to="/assignments"
              label="Alocações"
              icon={<Calendar className="size-4" />}
            />
          </nav>
        </>
      )}

      {/* administration section - admin only */}
      {isAdmin && (
        <>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Administração
            </p>
          </div>
          <nav className="space-y-1">
            <NavItem
              to="/users"
              label="Usuários"
              icon={<Users className="size-4" />}
            />
          </nav>
        </>
      )}

      <div className="mt-auto pt-4 space-y-2">
        <div className="px-3 py-2">
          <ThemeToggle />
        </div>
        <NavItem
          to="/profile"
          label="Perfil"
          icon={<User className="size-4" />}
        />
        <button
          className="w-full flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
          onClick={() => signOut()}
        >
          <span className="mr-2">
            <Logout className="size-4" />
          </span>
          Sair
        </button>
      </div>
    </div>
  );
}
