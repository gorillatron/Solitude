Solitude
===
Solitude is a clutter less writing tool for writers who want some inspiration ala tweets while they write. Its a simple writer with a twitter feed where you can get inspiration by supplying inspirational words, phrases of hashtags to search by.

To build on OSX:

	cd /path/to/Solitude
	/path/to/requirejs/build/build.sh app.build.js

To package .crx (Chrome app) on OSX:

	cd /path/to/Solitude/build
	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=./Solitude/
	
To install just open Google Chrome -> Extensions -> drag .crx file into the window -> Accept
