four51.app.factory('Shipper', ['$resource', '$451', '$http', function($resource, $451, $http) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function buildCacheID(order) {
		var cacheID = "451Cache.Shippers." + order.ID;
		angular.forEach(order.LineItems, function(item) {
			cacheID += item.Quantity + item.Product.InteropID + item.ShipAddressID;
		});
		return cacheID;
	}

    var _query = function(order, success) {
	    if (!order) return null;
	    //var id = buildCacheID(order),
		//    shippers = store.get(id);
		//shippers ? _then(success, shippers) :
	        $resource($451.api('shipper')).query().$promise.then(function(list) {
		//        store.set(id, list);
	            _then(success, list);
	        });
    }

    var _getRates = function(location, order, success){
        var lineItems = [];
        angular.forEach(order.LineItems, function(lineitem) {
            var specs = [];
            angular.forEach(lineitem.Specs, function(spec) {
                var s = {};
                s.name = spec.Name;
                s.value = spec.Value;
                specs.push(s);
            });
            var li = {
                specs:specs,
                productName:lineitem.Product.Name,
                productID:lineitem.Product.ExternalID,
                quantity:lineitem.Quantity,
                unitPrice:lineitem.UnitPrice,
                lineTotal:lineitem.LineTotal
            };
            lineItems.push(li);
        });
        $http.jsonp('https://solutions.four51.com/api/ShippingRates?callback=JSON_CALLBACK', {
            params: {
                accountid: '40bbe1e0f542340d8c911dbf74d4c442',
                state: location.selectedState,
                zip: location.selectedZip,
                lineItems : JSON.stringify(lineItems),
                street: "",
                city: ""
            }
        })
        .success(function(data) {
            _then(success, data);
        });
    };

    return {
        query: _query,
        getRates: _getRates
    }
}]);