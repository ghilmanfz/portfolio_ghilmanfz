import expData from "./experience.json";

export interface ExperienceItem {
  title: string;
  company: string;
  type: string;
  period: string;
  highlights: string[];
}

export interface CoreExpertise {
  title: string;
  skills: string[];
}

export const experiences: ExperienceItem[] = expData.experiences as ExperienceItem[];
export const coreExpertise: CoreExpertise[] = expData.coreExpertise as CoreExpertise[];
