import { z } from "zod";

export const reportSchema = z.object({
  title: z.string().min(5),
  introduction: z.string().min(20),
  dataCollectionMethod: z.string().optional(),
  challengeRecommendation: z.string().optional(),
  executiveSummary: z.string().optional(),
  conclusion: z.string().min(20),
});

export type reportSchemaType = z.infer<typeof reportSchema>;