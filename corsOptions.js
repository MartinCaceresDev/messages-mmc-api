const { urlFront } = require("./utils/urlFront");

const whiteList = [
    urlFront.production
]

const corsOptions = {
    origin: (origin, callback)=>{
        if ( whiteList.includes(origin) ){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions;