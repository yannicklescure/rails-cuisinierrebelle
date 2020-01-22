const initCors = () => {
  const express = require('express')
  const cors = require('cors')
  const app = express()

  const whitelist = ['http://localhost:3000']
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  app.get('/recipes/:id', cors(corsOptions), (req, res, next) => {
    res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
  })

  app.listen(80, () => {
    console.log('CORS-enabled web server listening on port 80')
  })
}

export { initCors };
