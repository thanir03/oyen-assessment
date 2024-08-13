import { FormEvent, useRef, useState } from "react";
import { validatePassword, validateUsername } from "../utils/helper";

interface IAuthFormProps {
  onSubmit: (username: string, password: string) => void;
  buttonTitle: string;
}

const AuthForm = (props: IAuthFormProps) => {
  const [invalidUsernameMessage, setInvalidUsernameMessage] =
    useState<string>();
  const [invalidPwdMessage, setInvalidPwdMessage] = useState<string>();
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const userInput = useRef<HTMLInputElement | null>(null);

  return (
    <form
      className="text-center flex flex-col items-center gap-5"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(userInput.current!.value, passwordInput.current!.value);
      }}
    >
      {/* Username input field */}
      <div className="flex flex-col gap-3">
        <label className="self-start" htmlFor="user">
          Username
        </label>
        <input
          className="text-black min-w-72 lg:min-w-96 px-3 py-2 outline-none rounded-md"
          ref={userInput}
          type="text"
          onBlur={(e) => {
            if (!validateUsername(e.target.value)) {
              setInvalidUsernameMessage("Username is required");
            } else {
              setInvalidUsernameMessage("");
            }
          }}
        />
        {invalidUsernameMessage && (
          <p className="text-red-600">{invalidUsernameMessage}</p>
        )}
      </div>
      {/* Password input field */}
      <div className="flex flex-col gap-3">
        <label className="self-start" htmlFor="user">
          Password
        </label>
        <input
          className="text-black min-w-72 lg:min-w-96 px-3 py-2 outline-none rounded-md"
          ref={passwordInput}
          type="password"
          onBlur={(e) => {
            if (!validatePassword(e.target.value)) {
              setInvalidPwdMessage(
                "Password must consist of at least one digit, one special character, one uppercase character, one lowercase character and minimum length of 5 characters"
              );
            } else {
              setInvalidPwdMessage("");
            }
          }}
        />
        {invalidPwdMessage && (
          <p className="text-red-600 max-w-72 text-center break-words">
            {invalidPwdMessage}
          </p>
        )}
      </div>
      <button
        className="bg-oyen px-20 py-2 rounded-md outline-none"
        type="submit"
      >
        {props.buttonTitle}
      </button>
    </form>
  );
};

export default AuthForm;
