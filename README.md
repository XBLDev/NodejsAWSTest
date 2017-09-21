# NodejsAWSTest
Hosting nodejs on AWS, mostly practice and experiments

Comment 21/09/2017, 7:11 pm:

Today built an instance with Ubuntu OS, installed Node, apache. Ran the code 
in this repository, and some simple server with just Express. The idea here is 
that I put a index.html under www folder, and in it I include the client JS that
calls the Express server, and server responds.

However it doens't work this way, apparently NodeJS can't just run on apache:
https://stackoverflow.com/questions/14369865/running-node-js-in-apache

One possible way is to let index.html to connect to a nodejs page, but for now 
I have no idea how to do that.

Comment 20/09/2017, 5:00 pm:

Tried running NodeJS stitching: https://www.npmjs.com/package/video-stitch, which
doesn't require installing the package on Linux, however there's still no 
successful response from server. So far the only package that can run properly 
is the Find file pacakge: https://www.npmjs.com/package/find, which doesn't 
require too much running time, or modifying any file.

Turns out that it's probably not possible to install handbrake on 
Amazon Linux, because all handbrake releases are for Ubuntu. If I want to 
use handbrake I probably need to create a new EC2 instance that runs Ubuntu
instead of Amazon Linux.

Comment 20/09/2017, 3:00 pm:

The initial intention of hosting the NodeJS files in this 
repository was that, to use handbrake JS: https://github.com/75lb/handbrake-js
as a server function, and potentially make React Native send 
a POST request using Fetch: https://facebook.github.io/react-native/docs/network.html

However it turns out that simply including handbrake JS won't 
work in this case, because all the code now instead of being on 
windows, is on Linux, which requires mannually install handbrake, 
as stated in the handbrake JS github.

So the next step is to install a new EC2 instance that runs Linux,
install nodeJS/NPM/handbrake on it, and see if handbrake can work 
as intended.

