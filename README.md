# techdegree-p5-publicApiRequest

## What it is

This is the fifth project in Treehouse Javascript Full stack Techdegree.
In this project, I build an app to share the contact information of employees for a fiction startup company. I use **Fetch API** with the Random User Generator API (https://randomuser.me/) to grab information for 12 random employees living in the US. All JS codes are from me, other files are provided by Treehouse.

## How it works
Once the page is loaded, the app requests a JSON object from the API. After Promise is resolved, getEmployees() generates and displays HTML markup for each employee data. Then, the function generates modal HTML markup, assign it to an object instance and store the object in an array, named modals. Every time the user clicks the employee contact, the callback function in the event listener appends the HTML object in the array to the container div. 

Next, another function of activating the buttons in modal is executed. The buttons are closing and toggle buttons to switch back and forth between employees. Last but not least, search HTML markup is added to the header element. The search function compares a value of input element with the name in the employee contact information, then update display property of the info to 'none' or ''.

## Changes in style.css
* Color in card div
* Background color in body
* Font
* Shadow in card div