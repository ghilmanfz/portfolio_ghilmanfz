import siteJson from "./site.json";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  dribbble?: string;
  website?: string;
}

export interface SiteData {
  name: string;
  firstName: string;
  logo: string;
  role: string;
  roleSecondary: string;
  location: string;
  locationFull: string;
  badge: string;
  heroTitle: string[];
  heroDescription: string;
  heroCTAPrimary: { label: string; href: string };
  heroCTASecondary: { label: string; href: string };
  aboutTitle: string[];
  aboutRole: string;
  aboutBio: string;
  aboutBioSecondary: string;
  aboutPhoto: string;
  email: string;
  phone: string;
  whatsapp: string;
  resumeUrl: string;
  experienceDescription: string;
  social: SocialLinks;
  seoTitle: string;
  seoDescription: string;
  availableForWork: boolean;
  availabilityText: string;
}

export const siteData: SiteData = siteJson as SiteData;
