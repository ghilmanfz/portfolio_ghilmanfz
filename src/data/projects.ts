import projectsData from "./projects.json";

export interface Screenshot {
  url: string;
  caption: string;
}

export interface Video {
  url: string;       // YouTube URL, Vimeo URL, or /videos/filename.mp4
  caption: string;   // optional description
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
  videos?: Video[];
  links?: {
    live?: string;
    github?: string;
    figma?: string;
    demo?: string;
  };
}

export const projects: Project[] = projectsData as Project[];
