"use client";
import { useFormContext } from "react-hook-form";
import { P } from "../providers";

export const Password: FC<P> = (props) => {
  const { fieldConfig, ...prop } = props;

  const { register } = useFormContext();

  return <input {...prop} {...fieldConfig} {...register<string>("password")} />;
};
