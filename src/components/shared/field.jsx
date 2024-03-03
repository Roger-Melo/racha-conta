const Field = ({ children, labelText, inputName, inputType }) =>
  <label className="flex justify-between font-normal first-letter:inline-block first-letter:mr-1 first-letter:text-[1.8rem]">
    {labelText}
    {children || <input name={inputName} type={inputType} className="text-dark-gray-blue mb-2 text-inherit text-[1.5rem] p-[0.7rem] text-center rounded" />}
  </label>

export { Field }
