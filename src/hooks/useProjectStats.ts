import { useState, useEffect } from 'react';
import { getProjectStats, ProjectStats } from '@/api/projectStats';

export const useProjectStats = () => {
  const [stats, setStats] = useState<ProjectStats>({
    totalProjects: 0,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      console.log('Fetching project stats...');
      setLoading(true);
      const data = await getProjectStats();
      console.log('Received project stats:', data);
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Error in useProjectStats:', err);
      setError('Failed to fetch project statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up project stats...');
    fetchStats();

    // Set up polling to check for updates every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => {
      console.log('Cleaning up project stats...');
      clearInterval(interval);
    };
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}; 