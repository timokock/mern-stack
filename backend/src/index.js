require('dotenv').config()
const app = require('./app')
require('./database')

async function main() {
    await app.listen(app.get('port'))
    console.log('Server listening on port ' + app.get('port'))
}

main()