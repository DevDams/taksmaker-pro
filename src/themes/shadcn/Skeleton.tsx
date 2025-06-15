import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
}

export function Skeleton({ className, height, width }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-gray-200 rounded", className)}
      style={{ height, width }}
    />
  );
}

// Skeleton spécifique pour les tâches
export function TaskSkeleton() {
  return (
    <div className="bg-card p-4 rounded-lg border space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-2">
          <Skeleton height={20} width="70%" />
          <Skeleton height={16} width="90%" />
          <div className="flex gap-2">
            <Skeleton height={24} width={60} />
            <Skeleton height={24} width={80} />
            <Skeleton height={16} width={120} />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton height={32} width={80} />
          <Skeleton height={32} width={80} />
        </div>
      </div>
    </div>
  );
}
