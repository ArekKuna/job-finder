import { z } from "zod";

export const userAuthenticationSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter valid email" })
    .min(1, { message: "This field is required" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export type userAuthenticationSchemaType = z.infer<
  typeof userAuthenticationSchema
>;
