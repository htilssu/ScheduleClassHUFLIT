import { Class } from "@prisma/client";
import { ClassData } from "../types";

/**
 * Save scheduled classes to local storage.
 * @param classes Array of classes to save.
 */
export function saveClassToLocal(classes: Class[]) {
  localStorage.setItem("classes", JSON.stringify(classes));
}

/**
 * Load scheduled classes from local storage.
 */
export function loadClassFromLocal(): ClassData[] {
  if (typeof window !== "undefined") {
    const classes = localStorage.getItem("classes");
    if (classes) {
      return JSON.parse(classes);
    }
  }

  return [];
}
