const https = require('https')

https.request({ url: 'https://dummyimage.com/600x400/000/fff', encoding: null }, res => {
    console.log(res)
})