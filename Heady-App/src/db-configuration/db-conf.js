const mongoose = require('mongoose')

const mongooseUrl = `mongodb://localhost:27017/headyshop`
mongoose.connect(mongooseUrl,
{
    useNewUrlParser : true,
    useUnifiedTopology: true
})

module.exports = mongoose