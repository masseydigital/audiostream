Make sure you have installed:

Node.js

Modules: Install the following with "npm install moduleName"

express //for directory organization
socket.io //for realtime server communication to webpage
jplayer //for potential audio player
colors //cosmetics for command prompt

Running the node local server:

-Open "Node Command Prompt"
-Use "cd" to navigate to the server folder. "dir" will tell you the contents of your current directory
-Launch the server with "node index.js"
-Server will start listening on a particular port (set to 8080)
-Open browser and go to "localhost:8080"
-From here you can navigate to individual html pages stored in the view folder
by adding /yourFileHere.html to localhost:8080. When adding new pages,
be sure to add a new app.get in the index.js script.

Batch File Instructions (in case you don't want to retype the same instructions every time you debug):

cd "C:\Program Files\nodejs" //Default Directory of where Node should be stored
call nodevars.bat //Calls the batch file connected to Node Command Prompt
cd "C:\YourRepoWebsiteDirectoryGoesHere" //Add your index.js folder directory here
node index.js //Launches index.js
cmd /k //Prevents the cmd from immediately closing
