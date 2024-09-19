type Button = {
    children : JSX.Element | string | (JSX.Element | string)[];
    className? : string;
    onClick? :() => void;
}

export const Button = ({children, className, onClick }: Button) => {
  return (
    <button type='submit' className={className} onClick={onClick}>
       {children}
    </button>

  )
}