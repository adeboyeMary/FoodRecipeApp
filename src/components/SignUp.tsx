import { useDispatch, useSelector } from "react-redux";

import Input from "../components/Input";
import Button from "../components/Button";
import { SignUpThunk } from "../store/authThunk";
import { AppDispatch, RootState } from "../store";
import { setUser } from "../store/authSlice";


const SignUp = () => {
   const dispatch = useDispatch<AppDispatch>();
   const {loading, error, user } = useSelector((state: RootState) => state.auth);

    const formSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       dispatch(SignUpThunk(user.username, user.password));

    };
    

    return (
        <form onSubmit={formSubmitHandler} className=" w-[92%] md:w-[60%] lg:w-[40%] md:mt-[2rem] 
            lg:my-[5rem] m-auto pb-4 bg-[#D9D9D9] rounded-lg border-solid border-[1px] border-[#AEAEAE] 
            shadow-2xl gap-3 flex flex-col pt-4 px-5">
            <label className={error ? `text-red-600` : `text-black font-bold`}>Username</label>    
            <Input 
                type="text"
                value={user.username}
                onChange={(e)=> dispatch(setUser({...user, username: e.target.value}))}
                placeholder="e.g alex@email.com"  
                className="mb-[1.5rem]" 
            />

            <label className={error ? `text-red-600` : `text-black font-bold`}>Password</label> 
            <Input 
                type="password"
                value={user.password}
                onChange={(e)=> dispatch(setUser({...user, password: e.target.value}))}
                placeholder="minimum of 8, uppercase, number, and character"
                className="pl-2 outline-none py-3" 
            />
            {error && <p className="text-red-600 text-center pt-1"> {error}</p>}
           
            <Button disabled={loading} className={loading ? 'text-red-600' : 'text-black'}>
                {loading ? 'Signing up...' : 'Signup'}
            </Button>
        </form>
    )
};

export default SignUp;