module.exports = {
  '/users/login': {
    method: 'post',
    result(req, res, next) {
      return {
        code: 20000,
        data: {
          accessToken: '123456'
        }
      }
    }
  },
  '/users/info': {
    method: 'post',
    result(req, res, next) {
      return {
        code: 20000,
        data: {
          user: {
            id: 0,
            username: 'admin',
            password: 'any',
            name: 'Super Admin',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            introduction: 'I am a super administrator',
            email: 'admin@test.com',
            phone: '1234567890',
            roles: ['admin']
          }
        }
      }
    }
  }
}