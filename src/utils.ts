export type User = {
  id: string;
  login: string;
  password:string;
  age:number;
  isDeleted:boolean;
}



export const changePassword = (password:string): string => {
  return  Array(password.length).join('*')
}

export const getUser = (users:User[], reqId:string): User|undefined => {  
  return users.find(u => u.id === reqId)
}

const sortedUsers = (filteredUsers:User[]):User[] => filteredUsers.sort((a, b) => {
  if (a.login < b.login) return -1;
  if (a.login > b.login) return 1;
  return 0;
});

export const getAutoSuggestUsers = (loginSubstring: string, limit: number, users: User[]): User[] => {
  const filteredUsers = users.filter(user => user.login.includes(loginSubstring));
  return sortedUsers(filteredUsers).slice(0, limit);
}

const validPassworkRegexp =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
export const validations = {
  login: {
    notEmpty: {
      errorMessage: 'Login is required'
    }
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
    matches: {
      options: validPassworkRegexp,
      errorMessage: ''
    }
  },
  age: {
    isInit: true,
    errorMessage: 'Age must be a number',
    isInt: {
      options: { min: 4, max: 130 },
      errorMessage: 'Age must be between 4 and 130'
    }
  }
}