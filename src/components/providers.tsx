import {
  createFormInstantContainer,
  InputMapping,
  ParsedField,
} from "@form-instant/react-input-mapping";
import { createZodSchemaFieldConfig } from "@form-instant/react-resolver-zod";
import { Counter } from "./Counter";
import { Password } from "./components/password";

export type P = ParsedField<
  React.InputHTMLAttributes<HTMLInputElement>,
  string
>;
type K =
  | "counter"
  | "text"
  | "email"
  | "password"
  | "date"
  | "scanner"
  | "object";

const inputMapping = new InputMapping<P, K>({
  fallback: (props) => {
    const { fieldConfig, ...prop } = props;

    return <input {...prop} {...fieldConfig} />;
  },
  textarea: () => <textarea />,
  number: () => <input type="number" />,
  counter: () => <Counter />,
  text: (props) => {
    const { fieldConfig, ...prop } = props;

    return <input {...prop} {...fieldConfig} />;
  },
  date: () => <input type="date" />,
  email: (props) => {
    const { fieldConfig, ...prop } = props;

    return <input {...prop} {...fieldConfig} />;
  },
  password: Password,

  select: (props) => {
    const { options } = props;

    return (
      <select>
        {options?.map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
    );
  },
  object: (props) => {
    console.log("props", props);
    const { fieldConfig, ...prop } = props;

    return <input {...prop} {...fieldConfig} />;
  },
});

export const { FormInstantInputsProvider, useInputMapping } =
  createFormInstantContainer<P, K>(inputMapping);

export const fieldConfig =
  createZodSchemaFieldConfig<React.InputHTMLAttributes<HTMLInputElement>>();
