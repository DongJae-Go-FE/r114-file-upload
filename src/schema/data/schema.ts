import { z } from "zod";

export const GET_DATA_SEND_SCHEMA = z.object({
  id: z.number(),
  dataName: z.string(),
  sendDate: z.string(),
  service: z.string(),
  addCycle: z.string(),
  addId: z.string(),
  addName: z.string(),
  addState: z.string(),
  addDate: z.string(),
});

export const POST_DATA_SEND_SCHEMA = z.object({
  dataName: z.string(),
  addCycle: z.string(),
  service: z.array(z.string()),
  fileList: z.array(z.string()),
});

export const PUT_DATA_SEND_SCHEMA = z.object({
  dataName: z.string(),
  addCycle: z.string(),
  service: z.string(),
  fileList: z.array(z.string()),
  reason: z.string(),
});

export const GET_DATA_ADD_RECORD_SCHEMA = z.object({
  dataName: z.string(),
  addState: z.string(),
  addReason: z.string(),
  addId: z.string(),
});
