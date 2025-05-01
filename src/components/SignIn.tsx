import { Link } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { SignInThunk } from "../store/authThunk";
import { setUser } from "../store/authSlice";


const SignIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error} = useSelector((state: RootState) => state.auth);
    const [enteredPassword, setEnteredPassword] = useState<string>('');


    const sigInFormSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(SignInThunk( user.username, enteredPassword ));
    };
    

    return (
        <form onSubmit={sigInFormSubmitHandler} className=" w-[92%] md:w-[60%] lg:w-[40%] md:mt-[2rem] 
            lg:my-[5rem] m-auto py-5 bg-[#D9D9D9] rounded-lg border-solid border-[1px] border-[#AEAEAE] 
            shadow-2xl px-5 flex flex-col">
            <div className="mb-[2rem] flex flex-col gap-2">
                <label className={error ? `text-red-600` : `text-black font-bold`}>Username</label>    
                <Input 
                type="text"
                value={user.username}
                onChange={(e)=> dispatch(setUser({...user, username: e.target.value}))}
                placeholder="e.g alex@email.com"  
                className={error ? `outline-red-400` : `outline-none`}   
                />
            </div>

            <div className="flex flex-col gap-2 mb-3">
                <label className={error ? `text-red-600` : `text-black font-bold`}>Password</label> 
                <Input 
                    type="password"
                    value={enteredPassword}
                    onChange={(e)=> setEnteredPassword(e.target.value)}
                    placeholder="minimum of 8, uppercase, number, and character"
                    className={error ? `outline-red-400` : `outline-none`}
                />
            </div>
            {error && <p className="text-red-600 text-center py-1">{error}</p>}

            <Button disabled={loading} className={loading ? 'text-red-600' : 'text-black'}>
                {loading ? 'Loading...' : 'Signin'}
            </Button>

            <p className="text-center pt-5">Do not have an account? <Link to='/SignUp' 
            className="text-[#633BFF]">Create account</Link></p>
        </form>
    )
};

export default SignIn;