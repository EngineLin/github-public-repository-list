import http from "./http";

export function fetchUserRepos(username) {
  return http.get(`/users/${username}/repos`);
}
