import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";


import { MdEmail, MdLock } from "react-icons/md";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logoWithText from "../assets/logoWithText.png"
import axiosInstance from "../lib/axios";
import { login } from "../redux/Slices/userSlices";
import { useDispatch } from "react-redux";


const UserLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });


  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/user/login", {
        email: data.email,
        password: data.password,
      });

      if (res.data.success) {
        localStorage.setItem("wf_token", res.data.token)
        dispatch(login(res.data.user))
        toast.success("User Login successfully!");
        navigate("/home");
      }


    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Signin failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-950">
      <div
        className="
                    relative flex min-h-screen w-full
                    items-center justify-center
                    [scrollbar-width:none]
                    min-[820px]:items-center
                "
      >

        {/* Background shapes */}

        <div
          className="
                        pointer-events-none
                        absolute
                        -right-[100px]
                        -top-[160px]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        opacity-[0.28]
                        blur-[90px]
                        animate-[drift_9s_ease-in-out_infinite]
                    "
          style={{
            background:
              "radial-gradient(circle, #c4b5fd 0%, #7c3aed 70%)",
          }}
        />

        <div
          className="
                        pointer-events-none
                        absolute
                        -bottom-[100px]
                        -left-[80px]
                        h-[380px]
                        w-[380px]
                        rounded-full
                        opacity-[0.22]
                        blur-[90px]
                        animate-[drift_12s_ease-in-out_infinite_reverse]
                    "
          style={{
            background:
              "radial-gradient(circle, #fbcfe8 0%, #ec4899 70%)",
          }}
        />

        <div
          className="
                        pointer-events-none
                        absolute
                        left-[10%]
                        top-1/2
                        h-[220px]
                        w-[220px]
                        rounded-full
                        opacity-[0.18]
                        blur-[90px]
                        animate-[drift_7s_ease-in-out_infinite_2s]
                    "
          style={{
            background:
              "radial-gradient(circle, #bfdbfe 0%, #3b82f6 70%)",
          }}
        />


        {/* Card */}

        <div
          className="
                        relative
                        z-10
                        w-full
                        max-w-[460px]
                        rounded-[36px]
                        border
                        border-violet-700/[0.07]
                        bg-white
                        px-12
                        pb-[52px]
                        pt-11
                        shadow-[0_24px_64px_rgba(109,40,217,0.13),0_4px_18px_rgba(0,0,0,0.06)]
                        animate-[cardIn_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]
                        max-[520px]:rounded-[26px]
                        max-[520px]:px-[26px]
                        max-[520px]:pb-11
                        max-[520px]:pt-[34px]
                    "
        >

          {/* Brand */}

          <div className="mb-8 h-10 w-auto">
            <Link to="/">
              <img src={logoWithText} className="h-full w-auto" alt="logo" />
            </Link>
          </div>


          {/* Heading */}

          <div className="mb-[30px]">

            <h1
              className="
                                m-0
                                font-['Playfair_Display']
                                text-[30px]
                                font-semibold
                                leading-[1.2]
                                tracking-[-0.02em]
                                text-[#1c1033]
                            "
            >
              User Login
            </h1>

          </div>


          {/* Form */}

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >

            {/* Email */}

            <div className="flex flex-col gap-[7px]">

              <label
                htmlFor="login-email"
                className="
                                    text-[13px]
                                    font-bold
                                    uppercase
                                    tracking-[0.02em]
                                    text-[#1c1033]
                                "
              >
                E-mail
              </label>

              <div className="relative flex items-center">

                <span
                  className="
                                        pointer-events-none
                                        absolute
                                        left-[14px]
                                        z-10
                                        flex
                                        items-center
                                        text-[17px]
                                        text-[#b0a8c8]
                                    "
                >
                  <MdEmail />
                </span>

                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`
                                        w-full
                                        rounded-xl
                                        border-[1.5px]
                                        bg-[#faf9ff]
                                        px-[14px]
                                        py-[13px]
                                        pl-[42px]
                                        font-['Nunito']
                                        text-sm
                                        font-medium
                                        text-[#1c1033]
                                        outline-none
                                        transition
                                        placeholder:text-[#c9c3de]
                                      selection:bg-white
                                        placeholder:font-normal
                                        focus:border-[#ffb508]
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                        ${errors.email
                      ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                      : "border-[#e4e0f0]"
                    }
                                    `}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Enter a valid email address",
                    },
                  })}
                />

              </div>

              {errors.email && (
                <span className="text-xs text-red-600">
                  {errors.email.message}
                </span>
              )}




              {/* Password */}

              <div className="flex flex-col gap-[7px]">

                <label
                  htmlFor="login-pass"
                  className="
                                    text-[13px]
                                    font-bold
                                    uppercase
                                    tracking-[0.02em]
                                    text-[#1c1033]
                                "
                >
                  Password
                </label>

                <div className="relative flex items-center">

                  <span
                    className="
                                        pointer-events-none
                                        absolute
                                        left-[14px]
                                        z-10
                                        flex
                                        items-center
                                        text-[17px]
                                        text-[#b0a8c8]
                                    "
                  >
                    <MdLock />
                  </span>

                  <input
                    id="login-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className={`
                                        w-full
                                        rounded-xl
                                        border-[1.5px]
                                        bg-[#faf9ff]
                                        px-[14px]
                                        py-[13px]
                                        pl-[42px]
                                        pr-[45px]
                                        font-['Nunito']
                                        text-sm
                                        font-medium
                                        text-[#1c1033]
                                        outline-none
                                        transition
                                        placeholder:text-[#c9c3de]
                                        placeholder:font-normal
                                        focus:border-[#ffb508]
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                        ${errors.password
                        ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                        : "border-[#e4e0f0]"
                      }
                                    `}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Password must be at least 6 characters",
                      },

                    })}
                  />

                  <button
                    type="button"
                    className="
                                        absolute
                                        right-3
                                        flex
                                        items-center
                                        rounded-md
                                        bg-transparent
                                        p-1
                                        text-[#6b7280]
                                        transition
                                        hover:text-violet-700
                                    "
                    onClick={() =>
                      setShowPass((v) => !v)
                    }
                    aria-label="Toggle password"
                  >
                    {showPass ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <span className="text-xs text-red-600">
                    {errors.password.message}
                  </span>
                )}


              </div>



            </div>


            {/* Submit */}

            <button
              className="
                                group
                                mt-0.5
                                flex
                                items-center
                                justify-center
                                gap-[9px]
                                rounded-xl
                                border-0
                                bg-gradient-to-br
                                from-[#FDC903]
                                to-[#F67A09]
                                px-7
                                py-[15px]
                                font-['Nunito']
                                text-[15px]
                                font-bold
                                tracking-[0.02em]
                                text-white
                                shadow-[0_5px_22px_rgba(109,40,217,0.22)]
                                transition
                                hover:-translate-y-0.5
                                hover:brightness-110
                                hover:shadow-[0_8px_30px_rgba(255,181,8,0.5)]
                                active:translate-y-0
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
              type="submit"
              disabled={loading}
            >

              {loading ? <Loader2 className=" animate-spin" /> : "Sign In"}
              {!loading &&
                <span
                  className="
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                >
                  <ArrowRight
                    size={17}
                    strokeWidth={2.5}
                  />
                </span>
              }

            </button>

            <p
              className="
                                m-0
                                text-center
                                font-['Nunito']
                                text-[13.5px]
                                text-[#6b7280]
                            "
            >
              Doesn't have an account?

              <Link
                to="/signup"
                className="
                                    ml-[3px]
                                    font-bold
                                    text-[#F67A09]
                                    no-underline
                                    transition
                                    hover:opacity-75
                                    hover:underline
                                "
              >
                Sign up
              </Link>

            </p>


            {/* Divider */}

            <div
              className="
                                flex
                                items-center
                                gap-3
                                text-[#6b7280]
                            "
            >

              <span className="h-px flex-1 bg-[#e4e0f0]" />

              <span
                className="
                                    whitespace-nowrap
                                    text-xs
                                    font-medium
                                "
              >
                Continue as captain
              </span>

              <span className="h-px flex-1 bg-[#e4e0f0]" />

            </div>


            {/* Social */}

            <div className="grid grid-cols-2 gap-3">

              <Link
                to="/captain-login"
                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border-[1.5px]
                                    border-[#F67A09]
                                    bg-white
                                    px-4
                                    py-[11px]
                                    font-['Nunito']
                                    text-[16px]
                                    font-semibold
                                    text-[#F67A09]
                                    transition
                                    hover:-translate-y-px
                                    hover:border-[#c8c2d8]
                                    hover:bg-[#FFC405]
                                    hover:text-white
                                    hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)]
                                "
                type="button"
              >

                Login
              </Link>

              <Link
                to="/captain-signup"
                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border-[1.5px]
                                    border-[#F67A09]
                                    bg-white
                                    px-4
                                    py-[11px]
                                    font-['Nunito']
                                    text-[16px]
                                    font-semibold
                                    text-[#F67A09]
                                    transition
                                    hover:-translate-y-px
                                    hover:border-[#c8c2d8]
                                    hover:bg-[#FFC405]
                                    hover:text-white
                                    hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)]
                                "
                type="button"
              >

                Signup
              </Link>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}

export default UserLogin