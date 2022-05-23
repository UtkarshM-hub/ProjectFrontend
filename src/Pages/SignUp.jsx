import React from "react";
import AuthContainer from "../Components/AuthContainer/JS/AuthContainer";
import SignUpForm from "../Components/SignUp/SignUpForm/JS/SignUpform";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({ show }) => {
  // Decleration
  const history = useHistory();
  // Handlers
  // const SignInHandler = (data) => {
  //   axios
  //     .post("https://somethingdotfunny.herokuapp.com/users/signup", data, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then(async (res) => {
  //       if (res.data.type === "Success") {
  //         await show({ message: res.data.message, type: res.data.type });
  //         history.push("/login");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const SignInHandler = async (data) => {
    await axios
      .post("https://somethingdotfunny.herokuapp.com/users/signup", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(async (res) => {
        if (res.data.type === "Success") {
          await show({ message: res.data.message, type: res.data.type });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContainer type="Signup">
      <SignUpForm show={show} SignIn={SignInHandler} />
    </AuthContainer>
  );
};

export default SignUp;
