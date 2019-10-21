**Functionalities**  
  
1. Authentication  
2. View menu and select items to order  
*Customer can view a menu list. He can select items from the menu along with their quantity. 
On selecting an item, it gets added to his cart. Within an item, customer can similarly select 
sub items along with their quantity.*  
3. Place an order    
*Once items have been selected, the customer can place an order on which, he is redirected to 
another screen with static info informing him of his placed order and 
displaying a upi pin in case he chooses that mode of payment.  
**Note**: Any customer can view the menu and select items but only a logged in customer can place 
an order*  

**Installations**  
  
1. install node.js and npm  
2. install expo client app on your ios or android phone and connect to the same wireless 
network as your computer  
3. json-server for dummy data: ```npm install json-server -g```  

**To run project**
    
1. move to app folder and run    
```npm install && npm start```.    
Use the Expo app to scan the QR code from your terminal to open your project  
2. Since the code is not completely integrated with database, to use dummy data, open another 
tab and run  
```json-server --watch db.json -p3001 -H 192.168.0.107```,  
where db.json is a json file with dummy data, 3001 is the port number and 192.168.0.107 is the 
host address. Make sure, the host address here is being used in */app/components/customer/config/baseUrl.js*  
3. Currently interaction with db is carried out via php. To make changes, the modified/new php 
files will need to be placed on the server housing the db.