const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  error,
  isRequired=true,
  readOnly = false,
  className,
  checked,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      <input
        defaultValue={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
        required={isRequired}
        readOnly = {readOnly}
        checked = {checked}
        className= {`w-full rounded-full shadow p-4 focus:outline-none hover:border hover:border-gray-700 transition-colors duration-1000 ease-in-out ${className}`}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default InputField