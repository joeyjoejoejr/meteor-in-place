if (Meteor.is_server){
Meteor.methods({
  editField: function(args) {
    var _id = args._id,
      record = models[args.model].findOne({_id: _id}),
      setter = {};
    
    console.log(args);    
    setter[args.key] = args.editable;

    if (record){
      models[args.model].update({_id: _id}, {$set: setter});
      return true
    }
      
    return false;
  }
});
}


