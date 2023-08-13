/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";



const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUser } = useUser();

    const Navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    // function to match email password with db and sent to home
    //TODO: const onSubmit = async (formData) => {
    //     console.log(formData)
    //     const email = formData.email;
    //     const password = formData.password;
    //     try {
    //         const response = await fetch(`http://localhost:5000/user/${email}/${password}`);
    //         const userData = await response.json();
    //         setUser(userData);
    //         Navigate(from, { replace: true });
    //         console.log(userData)
    //     } catch (error) {
    //         console.error("Error:", error.message);
    //     }
    // };

    const onSubmit = async (formData) => {
        const email = formData.email;
        const password = formData.password;
        try {
            // Send a request to the /user endpoint to get user data
            const userResponse = await fetch(`http://localhost:5000/user/${email}/${password}`);

            if (userResponse.ok) {
                const userData = await userResponse.json();

                // Send a request to the /jwt endpoint to get a token
                const jwtResponse = await fetch("http://localhost:5000/jwt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (jwtResponse.ok) {
                    const { token } = await jwtResponse.json();

                    // Store the token in local storage
                    localStorage.setItem("token", token);

                    // Set the user data in the context
                    setUser(userData);

                    // Navigate to the desired page
                    Navigate(from, { replace: true });
                } else {
                    console.error("Failed to log in");
                    localStorage.removeItem("token");
                }
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };


    return (
        <div className=" mx-auto flex justify-center items-center h-screen bg-gray-100" style={{
            backgroundImage: `url(https://i.ibb.co/FnRZ2Xd/1892783.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="md:w-2/6 bg-white rounded-lg shadow-lg p-6 bg-opacity-20">
                <h3 className="text-2xl font-semibold mb-4 text-white">Please Login</h3>
                <form className="mx-auto form-control w-[400px]" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder="Enter email"
                        className={`border border-black p-1 rounded mb-4 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">Valid email is required</p>}

                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                        })}
                        placeholder="Password"
                        className={`border border-black p-1 rounded mb-4 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            Password is required and must contain an uppercase letter and at least one number
                        </p>
                    )}

                    <input
                        className="p-2 bg-blue-600 text-white rounded-lg mt-4"
                        value="Log In"
                        type="submit"
                    />
                    <p>Don't have an account? <a className="text-blue-600" href="/register">Register</a></p>
                </form>


            </div>
        </div>
    );
}


export default Login;


