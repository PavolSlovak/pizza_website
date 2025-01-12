import React from "react";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value?: string;
  register: any;
  errors?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  name,
  value,
  register,
  errors,
}) => {
  return (
    <div className="mb-4 ">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="border p-2 outline-none w-full"
        {...register(name)}
      />
      {errors && <span className="text-red-500">{errors.message}</span>}
    </div>
  );
};

export default InputField;
