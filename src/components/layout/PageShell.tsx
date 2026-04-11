import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  breadcrumb,
  className
}: {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar breadcrumb={breadcrumb} />
        <main className={cn("flex-1 overflow-y-auto outline-none", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
