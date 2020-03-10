const slots =  require('./slots');

module.exports = (app) => {
  app.use('/api/slots', slots)
  // etc..
}