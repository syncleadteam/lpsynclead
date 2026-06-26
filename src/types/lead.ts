import { z } from "zod";

export const clientSchema = z.object({
  client_name: z.string().trim().min(2, "Nome muito curto").max(100),
  phone: z
    .string()
    .trim()
    .min(10, "Telefone inválido")
    .max(20)
    .regex(/^[0-9+()\s-]+$/, "Telefone inválido"),
  email: z.string().trim().email("Email inválido").max(255),
  company_name: z.string().trim().min(2, "Nome da empresa muito curto").max(150),
  business_sector: z.string().trim().min(2, "Informe o ramo").max(150),
});

export type ClientData = z.infer<typeof clientSchema>;

export type AgentsQuantity = "1_agente" | "2_agentes" | "3_agentes";

export type ModuleCode = string;

export interface LandingProduct {
  id: string;
  code: ModuleCode;
  name: string;
  description: string | null;
  price: number;
  category: "agent" | "module";
  requiredAgents: string[];
  position: number;
}

export interface LandingCatalog {
  agents: LandingProduct[];
  modules: LandingProduct[];
}

export interface FormState {
  client: ClientData;
  agents_quantity: AgentsQuantity | null;
  selected_agent_codes: ModuleCode[];
  observations: string;
}

export interface SubmitResult {
  quoteId: string;
  leadId: string;
  companyId: string;
  contactId: string;
  activityId: string;
  modules: { code: ModuleCode; name: string; price: number }[];
  total: number;
}

export const initialFormState: FormState = {
  client: {
    client_name: "",
    phone: "",
    email: "",
    company_name: "",
    business_sector: "",
  },
  agents_quantity: null,
  selected_agent_codes: [],
  observations: "",
};
