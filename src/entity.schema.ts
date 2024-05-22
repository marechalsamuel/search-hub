
import * as z from "zod";

export const entitySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    url: z
        .string()
        .url()
        .regex(/^.*\{\{search\}\}.*$/, "Url must contain `{{search}}`"),
});