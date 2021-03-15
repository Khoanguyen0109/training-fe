export default function hasPermission(authArr, role) {
  /**
   * If auth array is not defined
   * Pass and allow
   */
  if (!authArr) {
    return true;
  }
  /**
   * if auth array is empty means,
   * allow only user role is guest (null or empty[])
   */
  if (authArr.length === 0) {
    return !role || role.length === 0;
  }

  if (role && Array.isArray(role)) {
    return authArr.some((r) => role.indexOf(r) >= 0);
  }

  return authArr.includes(role);
}
