const validateEmail = email => {
  const [emailBeforeAt, emailAfterAt] = email.split("@");
  let validated = true;
  const emailRegex = /^[-!#$%&'*+0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (email.length > 254) {
    validated = false;
  } else if (!emailRegex.test(email)) {
    validated = false;
  } else if (emailBeforeAt.length > 64) {
    validated = false;
  } else if (emailAfterAt.split(".").some(segment => segment.length > 63)) {
    validated = false;
  }

  return validated;
};

export default validateEmail;
