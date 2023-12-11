import {
  BASE_URL,
  CONTENT_TYPE,
  GET_REQUEST,
  PATCH_REQUEST,
  POST_REQUEST,
  PUBLIC_TOKEN,
  DELETE_REQUEST,
} from "../constants/Constants";
const HEADERS = {
  Accept: CONTENT_TYPE,
  "Content-Type": CONTENT_TYPE,
};

export const postRequest = async (
  body: any,
  additionalUrl: string,
  token?: string
) => {
  //  const body = new URLSearchParams(BODY).toString();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const navigate = useNavigate();
  try {
    const response = await fetch(BASE_URL + additionalUrl, {
      method: POST_REQUEST,
      headers: { ...HEADERS, "x-access-token": token ?? PUBLIC_TOKEN },
      body: JSON.stringify(body),
    });
    console.log("response", response);
    // if (response.statusText == "Unauthorized") navigate("/bookGroupRoom");
    const json = await response.json();
    console.log("json", json);
    return json;
  } catch (err) {
    console.log("err", err);
    // alert(err);
    return err;
  }
};

export const getRequest = async (Url: string, token?: string) => {
  try {
    const response = await fetch(BASE_URL + Url, {
      method: GET_REQUEST,
      headers: { ...HEADERS, "x-access-token": token ?? PUBLIC_TOKEN },

    });
    const json = await response.json();
    if (json.error) {
      alert("some error occured");
    } else {
      return json;
    }
    console.log(json);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteRequest = async (Url: string, BODY: any, token?: any) => {
  try {
    const response = await fetch(
      BASE_URL + Url,
      {
        method: DELETE_REQUEST,
        headers: {
          Accept: CONTENT_TYPE,
          "Content-Type": CONTENT_TYPE,
          "x-access-token": token,
        },
        body: JSON.stringify(BODY),
      }
    );
    const json = await response.json();
    if (json.error) {
      alert("some error occured");
    } else {
      return json;
    }
    console.log(json);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const patchRequest = async (Url: string, BODY: any, token: any) => {
  try {
    const response = await fetch(BASE_URL + Url, {
      method: PATCH_REQUEST,
      headers: {
        Accept: CONTENT_TYPE,
        "Content-Type": CONTENT_TYPE,
        "x-access-token": token,
      },
      body: JSON.stringify(BODY),
    });
    const json = await response.json();
    if (json.error) {
      alert("some error occured");
    } else {
      return json;
    }
    console.log(json);
  } catch (error) {
    console.log("API ERROR: ", error);
    return error;
  }
};
