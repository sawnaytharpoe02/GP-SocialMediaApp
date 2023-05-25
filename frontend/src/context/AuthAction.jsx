// eslint-disable-next-line no-unused-vars
export const LoginStart = (userCredentials) => ({
    type : 'LOGIN_START',
});

export const LoginSuccess = (data) => ({
    type : 'LOGIN_START',
    payload : data
});

export const LoginFailure = (error) => ({
    type : 'LOGIN_START',
    payload : error
});