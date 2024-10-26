import {
  FormInstantElement,
  FormInstantProvider,
} from "@form-instant/react-resolver-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { fieldConfig } from "./providers";

const formSchema = z.object({
  security_data: z
    .object({
      email: z
        .string()
        .email()
        .superRefine(
          fieldConfig({
            fieldType: "email",
            placeholder: "example@mal.com",
          })
        ),
      password: z.string().superRefine(
        fieldConfig({
          type: "password",
          placeholder: "******",
        })
      ),
      confirm: z.string(),
    })
    .refine(({ confirm, password }) => confirm !== password, {
      message: "the confim password is diferent to password",
    }),

  personal_data: z.object({
    last_name: z.string().superRefine(
      fieldConfig({
        placeholder: "select date",
      })
    ),
    firse_name: z.string(),

    birthday: z.coerce.date().optional(),

    code: z.string(),

    personal_data_two: z
      .object({
        last_name: z.string().superRefine(
          fieldConfig({
            placeholder: "select aqui",
          })
        ),
        firse_name: z.string(),

        birthday: z.coerce.date().optional(),

        code: z.string(),
      })
      .superRefine(
        fieldConfig({
          type: "object",
          placeholder: "select aqui",
        })
      ),
  }),
});

type formSchemaType = Zod.infer<typeof formSchema>;

export const Forms = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = form.handleSubmit(
    (data) => {
      console.log("data", data);
    },
    (err) => {
      console.log("err", err);
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <FormProvider {...form}>
        <FormInstantProvider schema={formSchema}>
          <h1>your form</h1>
          <div>
            <FormInstantElement<formSchemaType> name="security_data" />
            <br />
            <FormInstantElement<formSchemaType> name="personal_data" />
          </div>

          <button type="submit">submit</button>
        </FormInstantProvider>
      </FormProvider>
    </form>
  );
};
