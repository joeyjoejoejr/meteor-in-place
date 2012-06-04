Meteor-in-place
=====================
An in-place editor for [Meteor](www.meteor.com)

This add-on gives some basic tool to add easily add in-place editing for records.

How To Setup
------------

*clone this repo into your own project

*make sure your code sets user either for everyone or just authorized users

    Eg. Session.set("user", true)
    
*make sure you have a function called checkAuth return true when someone is authorized

    Eg. function checkAuth(args){return true;}
    
*if you want to pass a key to your checkAuth function on the server use session set "auth"

*make sure there is a refference to any model you want to in-place edit in the models namespace

    Eg. var models = { Posts: new Meteor.Collection('posts')}

How To Use
----------

This addon gives you an ipFormFor handlebars helper that takes a refference to your record
the name of the model as a string
    
    <div>
      {{#ipFormFor post model='Posts'}}
      _everything in here gets the 'post' context (similar to the #with helper)_
      {{/ipFormFor}}      
    </div>
    
This addon currently has two inplace editing helpers "ipTextArea" and "ipTextField" 
that take a reference to the specific field to edit.
    
    <div>
      {{#ipFormFor post model='Posts'}}
        <div>
          {{#ipTextField title}}{{/ipTextField}}
        </div>
        <div>
          {{#ipTextArea title}}{{/ipTextArea}}
        </div>
      {{/ipFormFor}}      
    </div>


