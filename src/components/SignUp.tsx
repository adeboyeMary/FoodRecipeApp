const SignUp = () => {
    return (
        <div className="mt-[5rem]">
            <form className="flex flex-col w-[40%] p-4 gap-4 m-auto bg-[#D9D9D9] rounded-lg border-solid border-[1px] 
            border-[#AEAEAE] shadow-2xl">
                <label htmlFor="email" className="font-bold">Email address</label>
                    <input type="email" id="email" name="email"
                    className="pl-2 outline-none py-2" 
                    placeholder="e.g alex@email.com" required 
                />

                <label htmlFor="password" className="font-bold">Password</label>
                    <input type="password" id="password" name="password"
                    className="pl-2 outline-none py-2" 
                    placeholder="should be p to 8 digits" required 
                />

                <label htmlFor="password" className="font-bold">Confirm Password</label>
                    <input type="password" id="password" name="password"
                    className="pl-2 outline-none py-2" 
                    placeholder="should be p to 8 digits" required 
                />

                <button className="bg-[#c8c8c8] py-2 w-28 align-center rounded-lg font-bold m-auto 
                hover:bg-[#ebe5e5] hover:border-[1px] hover:border-solid hover:border-[#c8c8c8]">Sign up</button>
            </form>
        </div>
    )
};

export default SignUp;