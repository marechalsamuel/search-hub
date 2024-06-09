
import * as z from "zod";

export const entrySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    icon: z.string(),
    url: z
        .string()
        .url()
        .regex(/^.*\{\{search\}\}.*$/, "Url must contain `{{search}}`"),
});