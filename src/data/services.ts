import servicesData from "./services.json";

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = servicesData.services as Service[];
