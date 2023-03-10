const whiteList = ['https://messages-mmc.onrender.com', 'http://127.0.0.1:5173', 'http://localhost:5173']

const corsOptions = {
    origin: (origin, callback)=>{
        if ( whiteList.includes(origin) ){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;