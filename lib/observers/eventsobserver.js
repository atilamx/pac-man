Window.EventsObserver = (function(){
  var observerList   = [],
      objectContext  = null,
      objectCallback = null;

  function register(obj){
    observerList.push(obj)
  };

  function processEvents(){
    for (obj = 0; obj < observerList.length; obj++){
      observerList[obj].eventCall(objectContext.id,objectCallback);
    }
  };

  var setEvents = function(context,callback){
    objectContext  = context,
    objectCallback = callback;
    processEvents();
  };

  return {
    event: function(context,callback){
      setEvents(context,callback);
    },
    register: function(obj){
      register(obj)
    }
  }
})();

