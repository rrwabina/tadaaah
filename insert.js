// THIS IS FINAL

const dbConnect = require('./connectMongodb');

const insertData = async ()=>{ 
    let data = await dbConnect();
    let result = await data.insert(
            [{
                domain: 'voicebot.ai',
                name: '__smVID',
                expiration: '1677217936',
                host: true,
                http: false,
                site: 'unspecified',
                session: false,
                storeid: '0'
            },
            {
                domain: 'voicebot.ai',
                name: '__smVID',
                expiration: '1677217936',
                host: true,
                http: false,
                site: 'unspecified',
                session: false,
                storeid: '0'
            }]
    )
    console.log(result)
    if(result.acknowledged)
    {
        console.warn('data is inserted')
    }
}

module.exports = insertData;