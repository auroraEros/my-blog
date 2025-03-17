import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

function FileInput({
  type = "text",
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired,
  errors,
  className,
}) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);
  return (
    <>
      <label
        htmlFor="file-upload"
        className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex justify-center items-center gap-x-2 ${hasError ? "textField--invalid" : ""} ${className}`}
      >
        {label}
        <ArrowUpTrayIcon className="w-5 h-5" />
        <input
          type="file"
          id="file-upload"
          name={name}
          dir={dir}
          className="sr-only"
          value={value}
          onChange={onChange}
        />
      </label>
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </>
  );
}

export default FileInput;
