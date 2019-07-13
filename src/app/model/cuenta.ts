// User model based on the structure of github api at
// https://api.github.com/users/{username}
export interface Cuenta {
  username: string
  id_ml: string
  nickname: string
  registration_date: string
  first_name: string
  last_name: string
  address: Object 
  phone: Object
  status: Object
  reputation: Object
  token: string
}