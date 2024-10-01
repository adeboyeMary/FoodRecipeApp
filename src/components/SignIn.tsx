import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isDataTouched, setIsDataTouched] = useState<boolean>(false);

    const EmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setEnteredEmail(event.target.value);
    };
    const PasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setEnteredPassword(event.target.value);
    };
    const SubmitHandler = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        setIsDataTouched(true);

        if(enteredEmail.trim() === '' || enteredPassword.length < 5 ){
            setIsValid(false);
            return;
        }
        setIsValid(true);

        const data = {
            email: enteredEmail,
            password: enteredPassword
        }
        console.log(data, '-----working!!------');

        setEnteredEmail('');
        setEnteredPassword('');
    };

    const isDataValid = !isValid && isDataTouched;


    return (
        <div className=" w-[92%] md:w-[60%] lg:w-[40%] md:mt-[2rem] lg:my-[5rem] m-auto pb-4
        bg-[#D9D9D9] rounded-lg border-solid border-[1px] border-[#AEAEAE] shadow-2xl">
            <form onSubmit={SubmitHandler} className="flex flex-col gap-4 pt-4 px-3">
                <label htmlFor="email" className={isDataValid ? `text-red-600 font-bold` : `text-black font-bold`}>
                    Email address
                </label>
                <input type="email" id="email" name="email"
                    className="pl-2 outline-none py-2" 
                    value={enteredEmail} onChange={EmailChangeHandler}
                    placeholder="e.g alex@email.com"
                />

                <label htmlFor="password" className={isDataValid ? `text-red-600 font-bold` : `text-black font-bold`}>Password</label>
                <input type="password" id="password" name="password"
                className="pl-2 outline-none py-2" 
                value={enteredPassword} onChange={PasswordChangeHandler}
                placeholder="should be p to 8 digits" 
                />

                {isDataValid && <p className="text-red-600 text-center font-bold">Enter valid inputs.</p>}

                <button className="bg-[#c8c8c8] py-2 w-36 align-center rounded-xl font-bold m-auto 
                hover:bg-[#ebe5e5] hover:border-[1px] hover:border-solid hover:border-[#c8c8c8]">Sign in</button>
            </form>
            <p className="text-center pt-5">Do not have an account? <Link to='/SignUp' 
            className="text-[#633BFF]">Create account</Link></p>
        </div>
    )
};

export default SignIn;