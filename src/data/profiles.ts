import { Profile } from "@/types/profile";

export const profiles: Profile[] = [
  {
    id: "62101000",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/johndoe",
    image: "https://via.placeholder.com/300x300?text=John+Doe",
    description:
      "Software engineer with 3 years of experience in full-stack development. Passionate about building scalable applications.",
  },
  {
    id: "62101001",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 98765 43211",
    linkedin: "https://linkedin.com/in/janesmith",
    image: "https://via.placeholder.com/300x300?text=Jane+Smith",
    description:
      "Product manager specializing in fintech solutions. Experienced in leading cross-functional teams.",
  },
  {
    id: "62101002",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43212",
    linkedin: "https://linkedin.com/in/rajeshkumar",
    image: "https://via.placeholder.com/300x300?text=Rajesh+Kumar",
    description:
      "Data scientist with expertise in machine learning and data analysis. Currently working at a leading AI company.",
  },
  // Add remaining 129 profiles following the same format with IDs from 62101003 to 62101131
];
