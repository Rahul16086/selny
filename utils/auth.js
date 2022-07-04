import { API_KEY } from "@env";

const createUser = async (email, password) => {
  const user = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }
  );
  return user.json();
};

export default createUser;
