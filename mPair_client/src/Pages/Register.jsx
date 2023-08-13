import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";



const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");



    // function for post data to the db
    const onSubmit = async (formData) => {
        console.log(data)
        formData.status = "user";
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                if (formData) {
                    // Show success notification using Swal
                    Swal.fire({
                        icon: "success",
                        title: "User Added",
                        text: `User has been successfully added `,
                    });
                    window.location.href = "/login"
                    setData(JSON.stringify(formData));
                    // userState(data)
                    console.log(data)
                } else {
                    console.error("Failed to save user");
                }
            } else {
                console.error("Failed to save user");
            }
        } catch (error) {
            console.error("Error:", error);
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
                <form className="mx-auto form-control w-[800px]" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("name", { required: true })}
                        placeholder="Enter Name"
                        className={`border border-black p-1 rounded mb-4 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500">Name is required</p>}

                    <input
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder="Enter email"
                        className={`border border-black p-1 rounded mb-4 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">Valid email is required</p>}

                    <select
                        className={`border border-black p-1 rounded mb-4 ${errors.category ? 'border-red-500' : ''}`}
                        {...register("category", { required: true })}
                    >
                        <option value="">Select gender...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.category && <p className="text-red-500">Category is required</p>}

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
                        value="Register"
                        type="submit"
                    />
                    <p className="mt-2">
                        Already have an account?{' '}
                        <a className="text-blue-700" href="/login">
                            Login
                        </a>
                    </p>
                </form>


            </div>
        </div>
    );
}


export default Register;

