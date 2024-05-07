import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupType } from "@leelakrishna/medium-blog-common";
import { Link, useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v2/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up");
    }
  }
  return (
    <div className=" h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="font-extrabold text-3xl">Create an Account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an Account?"}

              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                type="text"
                placeholder="Leela Krishna"
                onChange={(e: { target: { value: any } }) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              type="text"
              label="email"
              placeholder="Leelakrishna682@gmail.com"
              onChange={(e: { target: { value: any } }) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="********"
              onChange={(e: { target: { value: any } }) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />

            <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 text-sm px-5 py-2.5 me-2 mb-2
              dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700
              focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg"
            >
              {type === "signup" ? "Signup" : "Signin"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelInterface {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({
  label,
  type,
  placeholder,
  onChange,
}: LabelInterface) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
}
