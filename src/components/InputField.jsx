const InputField = ({ label, type = 'text', value, onChange, placeholder, name, error }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full rounded-full shadow p-4 focus:outline-none hover:border hover:border-gray-700 transition-colors duration-1000 ease-in-out"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default InputField