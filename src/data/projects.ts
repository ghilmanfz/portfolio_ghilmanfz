import projectsData from "./projects.json";

export interface Screenshot {
  url: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  featured?: boolean;
  featuredOrder?: number | null;
  tags: string[];
  techIcons: string[];
  color: string;
  image?: string;
  logo?: string;
  problem?: string;
  solution?: string;
  screenshots?: Screenshot[];
  links?: {
    live?: string;
    github?: string;
    figma?: string;
    demo?: string;
  };
}

export const projects: Project[] = projectsData as Project[];
