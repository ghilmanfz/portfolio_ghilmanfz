import techData from "./techStack.json";

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  title: string;
  description: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = techData.techStack as TechCategory[];
