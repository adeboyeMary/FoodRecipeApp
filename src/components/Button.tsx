type ButtonProps = {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

const Button = ({children, disabled=false, className= ''}: ButtonProps) => {
    return(
        <button type="submit" disabled={disabled}
            className={`bg-[#c8c8c8] py-3 w-36 align-center rounded-xl font-bold m-auto 
                hover:bg-[#ebe5e5] hover:border-[1px] hover:border-solid hover:border-[#c8c8c8] mt-2 
                ${className}`}>
                {children}
        </button>
    )
};

export default Button;