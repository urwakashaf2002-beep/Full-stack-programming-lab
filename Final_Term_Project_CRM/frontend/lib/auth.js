export const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('crm_token') : null;
export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const u = localStorage.getItem('crm_user');
  return u ? JSON.parse(u) : null;
};
export const setAuth = (token, user) => {
  localStorage.setItem('crm_token', token);
  localStorage.setItem('crm_user', JSON.stringify(user));
};
export const clearAuth = () => {
  localStorage.removeItem('crm_token');
  localStorage.removeItem('crm_user');
};
export const isAuthenticated = () => !!getToken();