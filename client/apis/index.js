import axios from "@/utils/axios";

export function GetUserInfo(userId) {
  return axios.request({
    url: "/GetUserById",
    method: "GET",
    params: {
      userId: userId
    }
  });
}
