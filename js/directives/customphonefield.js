four51.app.directive('customphonefield', function() {
    var obj = {
        scope: {
            spec1 : '=',
            label: '@label',
            mask: '@mask'
        },
        restrict: 'E',
        templateUrl: 'partials/controls/customPhoneField.html',
        controller: ['$scope', function($scope) {
            $scope.$watch('spec1', function(n,o) {
                if (n) {
					$scope.phoneNumber = $scope.spec1.Value;
				}
            });

            $scope.$watch('phoneNumber', function(value){
                if (value.contains("(") && $scope.mask=="(999)999-9999") {
                    $scope.spec1.Value = "(" + value.substring(1,4) + ")" + value.substring(5,8) + "-" + value.substring(9,13);
                }
				else if (value && $scope.mask=="(999)999-9999") {
                    $scope.spec1.Value = "(" + value.substring(0,3) + ")" + value.substring(3,6) + "-" + value.substring(6,10);
				}
                if (value.contains(".") && $scope.mask=="999.999.9999") {
                    $scope.spec1.Value = value.substring(0,3) + "." + value.substring(4,7) + "." + value.substring(8,12);
                }
				else if (value && $scope.mask=="999.999.9999") {
                    $scope.spec1.Value = value.substring(0,3) + "." + value.substring(3,6) + "." + value.substring(6,10);
				}
                else if(value == ""){
                    $scope.spec1.Value = "";
                }
            });
        }]
    };

    return obj;
});