import router from '@/route/index';

export default function authRouter(store) {
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '';
    const userRoles = store.getters.userRoles;
    const requiredRoles = to.meta.roles || [];
    if (requiredRoles.length > 0) {
      if (requiredRoles.some((role) => userRoles.includes(role))) {
        next();
      } else {
        next('/auth-error');
      }
    } else {
      next();
    }
  });
}