const Button = ({ children, className, onClick }) =>
  <button onClick={onClick} className={`${className} text-white p-[0.8rem_1.2rem] border-transparent border-none border-0 rounded-[7px] font-semibold cursor-pointer`}>
    {children}
  </button >

export { Button }
