import { useTheme } from "@/hooks/useTheme";
import {
  Skeleton as MaterialSkeleton,
  TaskSkeleton as MaterialTaskSkeleton,
} from "@/themes/material/Skeleton";
import {
  Skeleton as ShadcnSkeleton,
  TaskSkeleton as ShadcnTaskSkeleton,
} from "@/themes/shadcn/Skeleton";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
}

export function Skeleton(props: SkeletonProps) {
  const { theme } = useTheme();

  if (theme === "material") {
    return <MaterialSkeleton {...props} />;
  }

  return <ShadcnSkeleton {...props} />;
}

export function TaskSkeleton() {
  const { theme } = useTheme();

  if (theme === "material") {
    return <MaterialTaskSkeleton />;
  }

  return <ShadcnTaskSkeleton />;
}
