import { UserInfoKey } from '@/store/types';

export default function restoreUser(store) {
  const userInfo = window.sessionStorage.getItem(UserInfoKey);
  if (userInfo) {
    store.replaceState({
      userInfo: JSON.parse(userInfo)
    });
  }
}