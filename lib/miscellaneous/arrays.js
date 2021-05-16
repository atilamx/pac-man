//Add some useful functions to the array prototype

Array.prototype.allValuesSame = function() {
  for(var i = 1; i < this.length; i++)
  {
    if(this[i] !== this[0])
      return false;
  }

  return true;
}
;
