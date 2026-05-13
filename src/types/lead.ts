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

export type ModuleCode =
  | "attendance_agent"
  | "sales_agent"
  | "support_agent"
  | "faq_ai"
  | "technical_ai"
  | "auto_scheduling"
  | "automatic_reminders"
  | "whatsapp_group_notifications"
  | "media_sending"
  | "bulk_messaging";

export interface FormState {
  client: ClientData;
  agents_quantity: AgentsQuantity | null;
  toggles: {
    faq_ai: boolean;
    technical_ai: boolean;
    auto_scheduling: boolean;
    automatic_reminders: boolean;
    whatsapp_group_notifications: boolean;
    media_sending: boolean;
    bulk_messaging: boolean;
  };
}

export interface SubmitResult {
  quoteId: string;
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
  toggles: {
    faq_ai: false,
    technical_ai: false,
    auto_scheduling: false,
    automatic_reminders: false,
    whatsapp_group_notifications: false,
    media_sending: false,
    bulk_messaging: false,
  },
};