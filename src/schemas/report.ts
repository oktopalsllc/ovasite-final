import { z } from "zod";

export const reportSchema = z.object({
  title: z.string().min(5),
  introduction: z.string().min(20),
  dataCollectionMethod: z.string().min(5),
  challengeRecommendation: z.string().min(20),
  executiveSummary: z.string().min(20),
  conclusion: z.string().min(20),
});

export type reportSchemaType = z.infer<typeof reportSchema>;