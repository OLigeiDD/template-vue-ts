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
  }
}
