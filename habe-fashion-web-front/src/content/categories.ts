import type { DesignCategory } from "@/types/content";

/**
 * Design categories presented on the homepage (REQ-SHOWCASE-001).
 *
 * The list is intentionally data-driven so additional categories can be
 * introduced without changing presentation logic (REQ-SHOWCASE-002).
 */
export const designCategories: DesignCategory[] = [
  {
    id: "ballet",
    name: "Vestidos de ballet",
    description: "Trajes de ballet para onstage y clases.",
  },
  {
    id: "casuales",
    name: "Vestidos casuales",
    description: "Diseños para el día a día.",
  },
  {
    id: "bodas",
    name: "Vestidos de novia",
    description: "Prendas para bodas y otras ocasiones especiales.",
  },
  {
    id: "quinceaneras",
    name: "Vestidos de quinceañera",
    description: "Diseños para la quinceañera.",
  },
  {
    id: "graduacion",
    name: "Vestidos de graduación",
    description: "Trajes para graduaciones.",
  },
  {
    id: "noche",
    name: "Vestidos de noche",
    description: "Vestidos de gala y de noche.",
  },
];