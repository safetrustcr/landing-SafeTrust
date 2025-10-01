import React from "react";
import { AlertCircle, LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error: string | null | undefined;
  touched: boolean | undefined;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  as?: "input" | "textarea";
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  icon: Icon,
  required,
  as = "input",
}) => {
  const Component = as;
  const showError = touched && error;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-black">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={20} />
          </div>
        )}
        <Component
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-11" : "pl-4"
          } pr-4 py-3 border rounded-lg focus:border-transparent transition-all text-black ${
            showError ? "border-red-500 bg-red-50" : ""
          } ${as === "textarea" ? "resize-none" : ""}`}
          rows={as === "textarea" ? 5 : undefined}
        />
      </div>
      {showError && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
