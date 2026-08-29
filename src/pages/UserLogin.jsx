import { useState } from "react";


import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";


function getStrength(p) {
  if (!p) return 0;

  let s = 0;

  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;

  return s;
}


const STRENGTH_META = [
  null,
  { label: "Weak", cls: "bg-red-600 text-red-600" },
  { label: "Fair", cls: "bg-amber-600 text-amber-600" },
  { label: "Good", cls: "bg-blue-500 text-blue-500" },
  { label: "Strong", cls: "bg-emerald-600 text-emerald-600" },
];


const UserLogin = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });


  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("/user/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });



      toast.success("Account created successfully!");


      navigate(
        location.state?.from || "/",
        {
          replace: true,
        }
      );

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Signup failed. Try again."
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

          <div className="mb-8 flex items-center gap-[11px]">

            <div
              className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-violet-700
                                to-violet-400
                                text-white
                                shadow-[0_4px_14px_rgba(109,40,217,0.22)]
                            "
            >
              <RiUserAddLine size={22} />
            </div>

            <span
              className="
                                font-['Playfair_Display']
                                text-xl
                                italic
                                tracking-[-0.01em]
                                text-[#1c1033]
                            "
            >
              Ridevy
            </span>

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
              Login
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
                                        placeholder:font-normal
                                        focus:border-violet-700
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(109,40,217,0.14)]
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
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
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
                                        focus:border-violet-700
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(109,40,217,0.14)]
                                        ${errors.password
                        ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                        : "border-[#e4e0f0]"
                      }
                                    `}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must be at least 8 characters",
                      },
                      validate: {
                        hasUpper: (v) =>
                          /[A-Z]/.test(v) ||
                          "Password must contain an uppercase letter",

                        hasNumber: (v) =>
                          /[0-9]/.test(v) ||
                          "Password must contain a number",
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
                                from-violet-700
                                to-violet-500
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
                                hover:shadow-[0_8px_30px_rgba(109,40,217,0.45)]
                                active:translate-y-0
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Login..."
                : "Login"}

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

            </button>


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
                or continue with
              </span>

              <span className="h-px flex-1 bg-[#e4e0f0]" />

            </div>


            {/* Social */}

            <div className="grid grid-cols-2 gap-3">

              <button
                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border-[1.5px]
                                    border-[#e4e0f0]
                                    bg-white
                                    px-4
                                    py-[11px]
                                    font-['Nunito']
                                    text-[13px]
                                    font-semibold
                                    text-[#1c1033]
                                    transition
                                    hover:-translate-y-px
                                    hover:border-[#c8c2d8]
                                    hover:bg-[#f9f8ff]
                                    hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)]
                                "
                type="button"
              >
                <span className="flex text-lg">
                  <FcGoogle />
                </span>
                Google
              </button>

              <button
                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border-[1.5px]
                                    border-[#e4e0f0]
                                    bg-white
                                    px-4
                                    py-[11px]
                                    font-['Nunito']
                                    text-[13px]
                                    font-semibold
                                    text-[#1c1033]
                                    transition
                                    hover:-translate-y-px
                                    hover:border-[#c8c2d8]
                                    hover:bg-[#f9f8ff]
                                    hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)]
                                "
                type="button"
              >
                <span className="flex text-lg">
                  <FaGithub />
                </span>
                GitHub
              </button>

            </div>


            {/* Footer */}

            <p
              className="
                                m-0
                                text-center
                                font-['Nunito']
                                text-[13.5px]
                                text-[#6b7280]
                            "
            >
              Already have an account?

              <Link
                to="/signup"
                className="
                                    ml-[3px]
                                    font-bold
                                    text-violet-700
                                    no-underline
                                    transition
                                    hover:opacity-75
                                    hover:underline
                                "
              >
                Sign up
              </Link>

            </p>

          </form>

        </div>

      </div >
    </div >
  );
}

export default UserLogin