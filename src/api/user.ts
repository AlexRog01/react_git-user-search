import { User } from '../types/User';

export const BASE_URL = 'https://api.github.com/users/';

export function getUser(userLogin: string): Promise<User> {
  return fetch(BASE_URL + userLogin)
    .then((response) => {
      if (!response.ok) {
        throw new Error ('ERROR');
      }

      return response.json();
    });
}
