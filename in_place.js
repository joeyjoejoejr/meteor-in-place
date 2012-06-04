if(Meteor.is_client){
  var ipRender = function (context, attr) {
    var modelName = context.model,
        model = window[modelName],
        keys = Object.keys(context),
        self = context,
        key;
           
    //get the key name
    for(var index in keys) {
      if(self[keys[index]] === attr){
        key = keys[index];
      }
    }
    
    var getChunk = function(){
      var eventMap = {};
      eventMap['click #ipshow'+key] = clickHandler;
      eventMap['blur #edit-'+key] = blurHandler;
      if(Session.get('user')){
        return Meteor.ui.chunk(function(){
          return Template[context.showTemplate]({key: key, attr: attr}) + 
            Template[context.editTemplate]({key: key, attr: attr});
        }, {events:eventMap});
      }else {
        return Meteor.ui.chunk(function(){
          return Template[context.showTemplate]({key: key, attr: attr});
        });
      }
    };
    
    var clickHandler = function(e) {
      var target = e.currentTarget;
      $(target).hide();
      $('#ipedit'+key).show();
      $('.edit-area').focus();
    };
    
    var blurHandler = function (e) {
      Meteor.call('editField', {
        _id:self._id, editable:$('#edit-'+key).val(), key: key, model: modelName
        }, function(err,res){
          console.log(err);
        });
      $('#ipedit'+ key).hide();
      $('#ipshow' + key).show();
    };
    
    return getChunk();
  };
   
  Handlebars.registerHelper('ipFormFor', function(record, options){

    if (!record || !options.hash || !options.hash["model"]) {
      console.log('No model defined');
      return ""
    }
    
    record.model = options.hash["model"];
    return options.fn(record);
  });

  //some of this seems hacky, but trying to keep it dry
  Handlebars.registerHelper("ipTextField", function (attr){
    this.editTemplate = "ipTextFieldEdit";
    this.showTemplate = "ipTextFieldShow";
    return ipRender(this, attr);
  });

  Handlebars.registerHelper("ipTextArea", function (attr){
    this.editTemplate = "ipTextAreaEdit";
    this.showTemplate = "ipTextAreaShow";
    return ipRender(this, attr);
  });
}





  
