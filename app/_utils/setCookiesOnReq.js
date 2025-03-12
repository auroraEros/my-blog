export function setCookiesOnReq(cookies) {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: `${accessToken?.name}=${accessToken?.value};${refreshToken?.name}=${refreshToken?.value}`,
    },
  };
  return option;
}
