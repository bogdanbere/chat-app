import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../store/usersReducer";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  MessageSquare,
  User,
  ALargeSmall,
} from "lucide-react";
import { toast } from "react-toastify";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSigninUp, setIsSingingUp] = useState(false);
  const users = useSelector((state) => state.users);

  const handleSingup = (e) => {
    e.preventDefault();
    setIsSingingUp(true);
    const user = {
      name: e.target.name.value.trim(),
      username: e.target.username.value.trim(),
      password: e.target.password.value.trim(),
    };

    let errors = false;

    if (users.some((username) => username === user.username)) {
      errors = true;
      toast.error("Username already in use");
    }

    if (!user.name) {
      errors = true;
      toast.error("Name is required");
    }

    if (!user.username) {
      errors = true;
      toast.error("Username is required");
    }

    if (user.password.length < 5) {
      errors = true;
      toast.error("Passwords length must be at least 6 characters");
    }

    if (errors) {
      setIsSingingUp(false);
      return;
    }
    dispatch(signup(user));
    setIsSingingUp(false);
    e.target.name.value = "";
    e.target.username.value = "";
    e.target.password.value = "";
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-base-100 p-6 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>

        <form onSubmit={handleSingup} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="John Doe"
                name="name"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Username</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ALargeSmall className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="username"
                name="username"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                name="password"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigninUp}
          >
            {isSigninUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
