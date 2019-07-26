# MongoDB

## Servidor Local

C:
cd "C:\Program Files\MongoDB\Server\4.0\bin\"
.\mongod


## GUI

C:
cd "C:\Users\fincu\AppData\Local\MongoDBCompass\"
.\MongoDBCompass.exe


## Shell

* Local *

.\mongo "mongodb://localhost/nodeapdb"

db.posts.find()
db.posts.remove( {"_id": ObjectId("5bcdc8ca440180150c376874")});

* Nube *

.\mongo "mongodb+srv://cluster0-xwx8a.mongodb.net/test" --username meanapp
CfU5gAhfFMmpI9kW
use nodeangular
show collections
db.posts.find()
