import { z } from "zod";

export const POST_LOGIN_SCHEMA = z.object({
  id: z.string().min(6).max(22),
  password: z.string().min(6).max(22),
  isIdSave: z.boolean({ coerce: false }),
});

export const POST_LOGIN_MEMBER_ADD_SCHEMA = z.object({
  id: z.string().min(6).max(22),
  identification: z.string().min(6).max(22),
  name: z.string().min(6).max(22),
  team: z.string().min(6).max(22),
  email: z.string().min(6).max(22),
});
