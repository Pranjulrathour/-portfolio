import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, BarChart2, Users, Clock } from "lucide-react";

interface ProjectCardProps {
  title: string;
  progress: number;
  team: Array<{ name: string; avatar: string }>;
  dueDate: string;
}

interface DashboardGridProps {
  projects?: ProjectCardProps[];
}

const defaultProjects: ProjectCardProps[] = [
  {
    title: "Website Redesign",
    progress: 75,
    team: [
      {
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        name: "Bob",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        name: "Charlie",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      },
    ],
    dueDate: "2024-04-15",
  },
  {
    title: "Mobile App Development",
    progress: 45,
    team: [
      {
        name: "David",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      {
        name: "Eve",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
      },
    ],
    dueDate: "2024-05-01",
  },
  {
    title: "Marketing Campaign",
    progress: 90,
    team: [
      {
        name: "Frank",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
      },
      {
        name: "Grace",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      },
      {
        name: "Henry",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
      },
    ],
    dueDate: "2024-03-30",
  },
];

const ProjectCard = ({ title, progress, team, dueDate }: ProjectCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          <BarChart2 className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Due {dueDate}</span>
            </div>
            <div className="flex -space-x-2">
              {team.map((member, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardGrid = ({ projects = defaultProjects }: DashboardGridProps) => {
  return (
    <div className="bg-slate-50 p-6 h-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              Active projects this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active contributors</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Deadlines
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;
