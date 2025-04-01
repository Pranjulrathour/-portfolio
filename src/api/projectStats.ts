import { supabase } from '@/lib/supabaseClient';

export interface ProjectStats {
  totalProjects: number;
  lastUpdated: string;
}

export const getProjectStats = async (): Promise<ProjectStats> => {
  try {
    console.log('Fetching project stats...');
    
    // Get total count of projects
    const { count, error: countError } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error fetching project count:', countError);
      throw countError;
    }

    console.log('Project count:', count);

    // Get the latest project for last updated timestamp
    const { data: latestProject, error: latestError } = await supabase
      .from('projects')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (latestError && latestError.code !== 'PGRST116') {
      console.error('Error fetching latest project:', latestError);
      throw latestError;
    }

    console.log('Latest project:', latestProject);

    const stats = {
      totalProjects: count || 0,
      lastUpdated: latestProject?.updated_at || new Date().toISOString()
    };

    console.log('Returning stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error in getProjectStats:', error);
    return {
      totalProjects: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}; 