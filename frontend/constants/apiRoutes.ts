const SERVER = 'http://localhost:8001';

export const ACCOUNT_REGISTER = SERVER + '/api/v1/accounts/register';
export const ACCOUNT_LOGIN = SERVER + '/api/v1/accounts/login';
export const ACCOUNT_LOGOUT = SERVER + '/api/v1/accounts/logout';
export const ACCOUNT_USERNAME_CHECK = SERVER + '/api/v1/users/exists/';
export const USERS_EDIT = SERVER + '/api/v1/users/edit';
export const POST_CREATE = SERVER + '/api/v1/posts/create';
export const PROFILE_FOLLOW = SERVER + '/api/v1/relations/follow';
export const PROFILE_UNFOLLOW = SERVER + '/api/v1/relations/unfollow';