angular.module("MobileApp").controller("loginController", function($scope) {
  $scope.messages = [];
  var socket = io.connect("http://localhost");
  
  socket.on("logging", function(data) {
    $scope.messages.push(data);
    $scope.$apply();
  });
  
  $scope.user = {email: "", password: ""};
  
  $scope.login = function() {
    socket.emit("logging", $scope.user);      
  }
    
});
