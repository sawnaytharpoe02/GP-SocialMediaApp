export const LoginStart = (userCredentials) => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (data) => ({
  type: 'LOGIN_START',
  payload: data,
});

export const LoginFailure = (error) => ({
  type: 'LOGIN_START',
  payload: error,
});

export const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});
