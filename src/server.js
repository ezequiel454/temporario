import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

class Server {
    constructor() {
        this.express = express()
        this.middlewares()
        this.routes()
        this.exception()
    }

    middlewares() {
        this.express.use(cors())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
    }

    routes() {
        this.express.use(require('./routes'))
    }

    exception() {
        this.express.use(async (err, req, res, next) => {
            let message = 'Internal Server Error!'

            console.log(err)

            return res.status(500).send({ msg: [{ message, error: 'Error' }] })
        })
    }
}

module.exports = new Server().express
