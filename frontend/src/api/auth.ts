const url = "http://localhost:8000";

interface ValidateUserResponse {
  status: boolean;
  message: string;
}

const checkWhetherUserIsLoggedIn = async (): Promise<ValidateUserResponse> => {
  try {
    const response = await fetch(`${url}/validate-token/`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
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
    });
    const json: { message: string } = await response.json();
    console.log(json);
    return { status: true, message: json.message };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Unknown error" };
  }
};

export { checkWhetherUserIsLoggedIn, logout };
