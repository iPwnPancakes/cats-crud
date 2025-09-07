import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./form";
import cn from "classnames";

export function TextField({ label, className, ...props }) {
  const field = useFieldContext();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm">{label}</label>
      <input
        className={cn("border border-gray-300 rounded px-2 py-1", className)}
        value={field.state.value}
        onChange={(e) => field.setValue(e.target.value)}
        {...props}
      />
      {errors.map((error) => (
        <div key={error} className="text-xs text-red-500">
          {error.message}
        </div>
      ))}
    </div>
  );
}
