const SelectField = ({ label, options, value, onChange, error }) => {
  return (

    <div className="relative">
     {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <select 
        name=""
        value={value}
        onChange={onChange}
        className="w-full rounded-full shadow p-4 focus:outline-none hover:border hover:border-gray-700 transition-colors duration-1000 ease-in-out">
           <option className="focus:border-0" value="">--Select--</option>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

    </div>
  )
}

export default SelectField