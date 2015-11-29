var htmlStrings = [
  '<p class="targetClassName"></p>',
  '<p class="otherClassName targetClassName"></p>',
  '<p><p class="targetClassName"></p></p>',
  '<p><p class="targetClassName"><p class="targetClassName"></p></p></p>',
  '<p><p></p><p><p class="targetClassName"></p></p></p>',
  '<p><p class="targetClassName"></p><p class="targetClassName"></p></p>',
  '<p><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></p>'
];

describe('getElementsByClassName', function(){

  // Define 'getElementsByClassName'
  'use strict';

  var getElementsByClassName = function(className) {
      var output = [];
      var recursiveClassFinder = function(elt) {
          var hasClass = false;
          var classes = elt.classList;
          if (classes) {
              for (var i = 0; i < classes.length; i++) {
                  if (classes[i] === className) {
                      hasClass = true;
                  }
              }
          }
          if (hasClass) {
              output.push(elt);
          }
          var kids = elt.children;
          if (kids && kids.length) {
              for(var j = 0; j < kids.length; j++) {
                  recursiveClassFinder(kids[j]);
              }
          }
      };
      recursiveClassFinder(document.body);
      return output;
  };

  it('should match the results of calling the built-in function', function(){
    $('body').addClass('targetClassName');
    htmlStrings.forEach(function(htmlString){
      var $rootElement = $(htmlString);
      $('body').append($rootElement);

      var result = getElementsByClassName('targetClassName');
      var expectedNodeList = document.getElementsByClassName('targetClassName');
      var expectedArray = Array.prototype.slice.apply(expectedNodeList);
      var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?
      expect(equality).to.equal(true);

      $rootElement.remove();
    });
    $('body').removeClass('targetClassName');
  });

});
