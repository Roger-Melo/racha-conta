const Form = ({ children, onSubmit, className }) =>
  <form onSubmit={onSubmit} className={`${className} text-[1.6rem] flex flex-col bg-dark-gray-blue rounded-[7px]`}>
    {children}
  </form>

export { Form }
