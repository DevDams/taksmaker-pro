import { Skeleton as MUISkeleton, Box } from "@mui/material";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
}

export function Skeleton({ height, width }: SkeletonProps) {
  return (
    <MUISkeleton
      variant="rectangular"
      height={height}
      width={width}
      sx={{ borderRadius: 1 }}
    />
  );
}

// Skeleton spécifique pour les tâches
export function TaskSkeleton() {
  return (
    <Box sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          <Skeleton height={24} width="70%" />
          <Box sx={{ mt: 1 }}>
            <Skeleton height={20} width="90%" />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Skeleton height={28} width={60} />
            <Skeleton height={28} width={80} />
            <Skeleton height={20} width={120} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton height={36} width={80} />
          <Skeleton height={36} width={80} />
        </Box>
      </Box>
    </Box>
  );
}
