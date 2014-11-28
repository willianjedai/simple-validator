var _validator = require( 'validator' );

module.exports = simpleValidator = (function() {
  var toFromValidator = function( type ) {
    switch(type) {
      case 'email':
        return 'isEmail';
        break;
      default: 
        return ''
    }
  }

  return {
    validate: function(requiredFields, params) {
      var errorFields = [];

      for (var i = requiredFields.length - 1; i >= 0; i--) {
        var rField = requiredFields[i],
          field = params[rField.field];

          field = params;
          for (var j = 0; j < rField.field.length; j++) {
            field = field[rField.field[j]] || '';
          }

        if( !field || (rField.type && typeof field !== rField.type) ) {
          errorFields.push(rField);
        } else if( rField.specialType && !_validator[toFromValidator(rField.specialType)](field) ) {
          errorFields.push(rField);
        }
      };
      return errorFields;
    }
  }
})();