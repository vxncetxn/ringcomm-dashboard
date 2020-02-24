import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useIdentityContext } from "react-netlify-identity";

import { ToastContext } from "./Context";

import useControlState from "./helpers/useControlState";
import validateFilled from "./helpers/validateFilled";
import validateEmail from "./helpers/validateEmail";

import Tab from "./components/Tab";
import Floater from "./components/Floater";
import Input from "./components/Input";
import InputError from "./components/InputError";
import DecisionButton from "./components/DecisionButton";

const Auth = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;

    & > * + * {
      margin-top: 20px;
    }
  }
`;

const AuthTab = styled(Tab)`
  align-self: end;
`;

const AuthBox = styled(Floater)`
  width: 450px;
  padding: 30px 20px;
`;

const AuthTitle = styled.h1`
  margin-bottom: 20px;
`;

const AuthForm = styled.form`
  & > div + div {
    margin-top: 20px;
  }

  & > div > label {
    display: block;
  }

  & > div > label + input,
  & > div > input + p {
    margin-top: 10px;
  }
`;

const AuthInput = styled(Input)`
  width: 100%;
`;

const AuthButton = styled(DecisionButton)`
  display: block;
  margin: 50px auto 0 auto;
`;

const AuthComp = () => {
  const setToastInfo = useContext(ToastContext);
  const [tabState, setTabState] = useState("Login");
  const { loginUser, signupUser } = useIdentityContext();

  const [
    loginEmailValue,
    setLoginEmailValue,
    loginEmailError,
    setLoginEmailError
  ] = useControlState("");
  const [
    loginPasswordValue,
    setLoginPasswordValue,
    loginPasswordError,
    setLoginPasswordError
  ] = useControlState("");
  const [
    signupEmailValue,
    setSignupEmailValue,
    signupEmailError,
    setSignupEmailError
  ] = useControlState("");
  const [
    signupPasswordValue,
    setSignupPasswordValue,
    signupPasswordError,
    setSignupPasswordError
  ] = useControlState("");

  const authorisedEmails = [
    "vance_tan@mymail.sutd.edu.sg",
    "mario_josephan@mymail.sutd.edu.sg"
  ];

  return (
    <Auth>
      <div>
        <AuthTab
          options={["Login", "Sign Up"]}
          tabState={tabState}
          setTabState={setTabState}
        />
        <AuthBox>
          {tabState === "Login" ? (
            <>
              <AuthTitle>Login to RingDash</AuthTitle>
              <AuthForm>
                <div>
                  <label>Email</label>
                  <AuthInput
                    value={loginEmailValue}
                    onChange={e => setLoginEmailValue(e.target.value)}
                    onBlur={e =>
                      validateFilled(e.target.value)
                        ? validateEmail(e.target.value)
                          ? setLoginEmailError("")
                          : setLoginEmailError("This email is invalid")
                        : setLoginEmailError("This field is required")
                    }
                  />
                  <InputError>{loginEmailError}</InputError>
                </div>
                <div>
                  <label>Password</label>
                  <AuthInput
                    type="password"
                    value={loginPasswordValue}
                    onChange={e => setLoginPasswordValue(e.target.value)}
                    onBlur={e =>
                      validateFilled(e.target.value)
                        ? setLoginPasswordError("")
                        : setLoginPasswordError("This field is required")
                    }
                  />
                  <InputError>{loginPasswordError}</InputError>
                </div>
                <AuthButton
                  onClick={e => {
                    e.preventDefault();

                    let emailValidated = true;
                    let passwordValidated = true;

                    if (validateFilled(loginEmailValue)) {
                      if (validateEmail(loginEmailValue)) {
                        setLoginEmailError("");
                      } else {
                        setLoginEmailError("This email is invalid");
                        emailValidated = false;
                      }
                    } else {
                      setLoginEmailError("This field is required");
                      emailValidated = false;
                    }

                    if (validateFilled(loginPasswordValue)) {
                      setLoginPasswordError("");
                    } else {
                      setLoginPasswordError("This field is required");
                      passwordValidated = false;
                    }

                    if (emailValidated && passwordValidated) {
                      loginUser(loginEmailValue, loginPasswordValue)
                        .then(user => console.log("Success! Logged in!", user))
                        .catch(err => {
                          let msg;
                          switch (err.message) {
                            case "invalid_grant: No user found with this email":
                              msg =
                                "Login failed - email or password is wrong.";
                              break;
                            case "invalid_grant: Invalid Password":
                              msg =
                                "Login failed - email or password is wrong.";
                              break;
                            case "invalid_grant: Email not confirmed":
                              msg =
                                "Login failed - email address ownership has not been verified.";
                              break;
                            default:
                              msg = "Login failed - something went wrong.";
                          }

                          setToastInfo({
                            triggered: true,
                            message: msg,
                            persistent: true
                          });
                        });
                    }
                  }}
                >
                  Login To Dashboard
                </AuthButton>
              </AuthForm>
            </>
          ) : (
            <>
              <AuthTitle>Sign Up for RingDash</AuthTitle>
              <AuthForm>
                <div>
                  <label>Email</label>
                  <AuthInput
                    value={signupEmailValue}
                    onChange={e => setSignupEmailValue(e.target.value)}
                    onBlur={e =>
                      validateFilled(e.target.value)
                        ? validateEmail(e.target.value)
                          ? setSignupEmailError("")
                          : setSignupEmailError("This email is invalid")
                        : setSignupEmailError("This field is required")
                    }
                  />
                  <InputError>{signupEmailError}</InputError>
                </div>
                <div>
                  <label>Password</label>
                  <AuthInput
                    type="password"
                    value={signupPasswordValue}
                    onChange={e => setSignupPasswordValue(e.target.value)}
                    onBlur={e =>
                      validateFilled(e.target.value)
                        ? setSignupPasswordError("")
                        : setSignupPasswordError("This field is required")
                    }
                  />
                  <InputError>{signupPasswordError}</InputError>
                </div>
                <AuthButton
                  onClick={e => {
                    e.preventDefault();

                    let emailValidated = true;
                    let passwordValidated = true;

                    if (validateFilled(signupEmailValue)) {
                      if (validateEmail(signupEmailValue)) {
                        setSignupEmailError("");
                      } else {
                        setSignupEmailError("This email is invalid");
                        emailValidated = false;
                      }
                    } else {
                      setSignupEmailError("This field is required");
                      emailValidated = false;
                    }

                    if (validateFilled(signupPasswordValue)) {
                      setSignupPasswordError("");
                    } else {
                      setSignupPasswordError("This field is required");
                      passwordValidated = false;
                    }

                    if (emailValidated && passwordValidated) {
                      if (authorisedEmails.includes(signupEmailValue)) {
                        signupUser(
                          signupEmailValue,
                          signupPasswordValue,
                          {},
                          false
                        )
                          .then(() =>
                            setToastInfo({
                              triggered: true,
                              message:
                                "Sign up successful - check your email to verify email address ownership.",
                              persistent: false
                            })
                          )
                          .catch(err => {
                            let msg;
                            switch (err.message) {
                              case "A user with this email address has already been registered":
                                msg =
                                  "Sign up failed - account with this email address already registered.";
                                break;
                              default:
                                msg = "Sign up failed - something went wrong.";
                            }

                            setToastInfo({
                              triggered: true,
                              message: msg,
                              persistent: true
                            });
                          });
                      } else {
                        setToastInfo({
                          triggered: true,
                          message:
                            "Sign up failed - email address has not been pre-authorized for sign up.",
                          persistent: true
                        });
                      }
                    }
                  }}
                >
                  Sign Up
                </AuthButton>
              </AuthForm>
            </>
          )}
        </AuthBox>
      </div>
    </Auth>
  );
};

export default AuthComp;
