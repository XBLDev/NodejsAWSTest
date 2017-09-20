# NodejsAWSTest
Hosting nodejs on AWS, mostly practice and experiments

Comment 20/09/2017:

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

