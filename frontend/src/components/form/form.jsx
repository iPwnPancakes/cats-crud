import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./textfield";

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {},
});

export { useAppForm };
