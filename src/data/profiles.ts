import { Profile } from "@/types/profile";
import { BASE_STUDENTS } from "@/data/students";

// Fallback profiles generated from the base student list
export const profiles: Profile[] = BASE_STUDENTS.map((student) => ({
  id: student.id,
  name: student.name,
  email: "",
  phone: "",
  linkedin: "",
  image: "",
  description: "",
  facebook: "",
  lastUpdated: "",
}));
