# Paper Round Tracker

A helpful paper round tracker to keep track of houses which have had their papers delivered. The user can easily mark the address as delivered or undelivered as well as the option to delete or add a property. The app can also be helpful in the setting up for the paper round as it lists the total of each type of newspaper required on that paper round.

<p align="center">
  <img width="600" src="https://github.com/GreenEagleKing/fish-bar/blob/main/magna-fish-bar.gif?raw=true">
</p>

# How It's Made:
Tech used: CSS, EJS, JS, NODE, EXPRESS, MONGODB

+ A simple layout is created in EJS which includes a form which is used to send POST requests to the server which in turn send the data to the database.
+ A Node server is used with Express to communicate with MongoDB database which is used to store the address and newwspaper data.
+ A main.js file is used to lookout for clicks and inputs on the webpage which then looks out for a POST, GET, PUT or DELETE request to send to the server.

# Optimizations:
+ Option to have the address more structured with a name, house number, street, postcode etc..
+ GPS navigation API included which marked deliveries as complete when the user travel to the address position on the GPS.
+ Add authentication for different users for different paper rounds


# Lessons Learned:
+ Communication between server and database
+ Structure of a front to backend web application
+ Using HTML templating langauge to put the data on display
