const app = require('./src/index')

PORT = process.env.PORT || 3000;

app.listen(PORT , () => console.log(`Server listening  to port ${PORT}`))