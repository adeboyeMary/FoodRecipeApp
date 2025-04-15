type InputProps = {
    type: string;
    value: string;
    placeholder: string;
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input = ({type, value, onChange, placeholder, className}: InputProps) => {
    return (
        <>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder} 
                className={`pl-2 outline-none py-3 ${className}`}
            />
        </>
    )
};

export default Input;