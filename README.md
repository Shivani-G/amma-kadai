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
    
**To view project**  
  
1. Check out the published app on expo [here](https://exp.host/@inavihs95/app). Currently available in
dev mode only.  
  
**To run project**
 
1. install node.js and npm  
2. install expo client app on your ios or android phone and connect to the same wireless 
network as your computer       
3. move to app folder and run    
```npm install && npm start```.    
Use the Expo app to scan the QR code from your terminal to open your project    
4. Currently interaction with db is carried out via php. To make changes, the modified/new php 
files will need to be placed on the server housing the db.  
5. Since integration with db is not yet complete, dummy data is stored in a file named- db.json 
which is also placed on the same server.  
