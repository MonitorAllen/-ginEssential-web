const userRoute = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      auth: true,
    },
    component: () => import('@/views/profile/Profile.vue'),
  },
]

export default userRoute
