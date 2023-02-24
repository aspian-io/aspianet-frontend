export interface MemoryStats {
  totalMemMb: number;
  usedMemMb: number;
}

export interface IDashboardSystemStats {
  cpuUsagePercentage: number;
  memoryUsage: MemoryStats;
}

export interface IDashboardPostsStatsDto {
  blogsNumber: number;
  newsNumber: number;
  projectsNumber: number;
}