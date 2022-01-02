import { UserInfoKey } from '@/store/types';
export function restoreUserInfo(store) {
  const userInfo = window.sessionStorage.getItem(UserInfoKey);
  if (userInfo) {
    store.replaceState(JSON.parse(userInfo));
  }
}