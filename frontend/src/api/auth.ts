const url = "http://localhost:8000";

interface ValidateUserResponse {
  status: boolean;
  message: string;
}

const checkWhetherUserIsLoggedIn = async (): Promise<ValidateUserResponse> => {
  try {
    const response = await fetch(`${url}/validate-token/`, {
      method: "GET",
      credentials: "include",
    });
    const json: ValidateUserResponse = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return { status: false, message: "Unknown error" };
  }
};

const logout = async (): Promise<ValidateUserResponse> => {
  try {
    const response = await fetch(`${url}/logout/`, {
      method: "GET",
      credentials: "include",
    });
    const json: { message: string } = await response.json();
    console.log(json);
    return { status: true, message: json.message };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Unknown error" };
  }
};

const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }

    return { status: true, message: json.message };
  } catch (err) {
    const error = err as Error;
    return { status: false, message: error.message };
  }
};

const register = async (username: string, password: string) => {
  try {
    const response = await fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return { status: true, message: json.message };
  } catch (err) {
    console.log(err);
    const error = err as Error;
    return { status: false, message: error.message };
  }
};

export { checkWhetherUserIsLoggedIn, logout, login, register };
