require('dotenv').config();

const server = require('./server');
// start server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
