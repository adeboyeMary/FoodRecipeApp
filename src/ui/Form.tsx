import { useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";

const Form = () => {
    const [enteredUsername, setUsername] = useState<string>('');
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isDataTouched, setIsDataTouched] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const formSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsDataTouched(true);
        if(enteredUsername.trim() === '' || enteredPassword.length < 8 ){
            setIsValid(false);
            return;
        }
        setIsValid(true);

        const url = process.env.REACT_APP_SIGNUP_URL || 'http://localhost:3008/user/signup';
        setLoading(true);
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({ username: enteredUsername, password: enteredPassword}),
            });

            const data = await response.json();

            if (response.ok){
                alert('Signup successful!');
                console.log('User signup successfully!', data);

                setUsername('');
                setEnteredPassword('');
                setError('');
            } else {
                throw new Error(data.message || 'Failed to sign up')
            }

            console.log(enteredUsername, enteredPassword, '...................');
        } catch (error: any) {
            setError(error.message);
            console.error('Error:', error);
        }

        setLoading(false);
    };
    const isDataNotValid = !isValid && isDataTouched;

    

    return (
        <form onSubmit={formSubmitHandler} className=" w-[92%] md:w-[60%] lg:w-[40%] md:mt-[2rem] 
            lg:my-[5rem] m-auto pb-4 bg-[#D9D9D9] rounded-lg border-solid border-[1px] border-[#AEAEAE] 
            shadow-2xl gap-3 flex flex-col pt-4 px-5">
            <label className={isDataNotValid ? `text-red-600` : `text-black font-bold`}>Username</label>    
            <Input 
                type="text"
                value={enteredUsername}
                onChange={(e)=>setUsername(e.target.value)}
                placeholder="e.g alex@email.com"  
                className="mb-[1.5rem]"
                  
            />

            <label className={isDataNotValid ? `text-red-600` : `text-black font-bold`}>Password</label> 
            <Input 
                type="password"
                value={enteredPassword}
                onChange={(e)=>setEnteredPassword(e.target.value)}
                placeholder="minimum of 8, uppercase, number, and character"
                className="pl-2 outline-none py-3" 
            />
            {isDataNotValid && <p className="text-red-600 text-center pt-1">Enter valid inputs.</p>}
            {error && <p className="text-red-600 text-center pt-1">Oops! Signup failed.</p>}
            <Button disabled={loading}>
                {loading ? 'Signing up...' : 'Signup'}
            </Button>
        </form>
    )
};

export default Form;