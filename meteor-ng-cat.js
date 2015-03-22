if (Meteor.isClient) {
	angular
		.module('cats', ['angular-meteor'])
		.config(function($interpolateProvider) {
			$interpolateProvider.startSymbol('[[');
			$interpolateProvider.endSymbol(']]');
		})
		.controller('CatsController', function($scope, $meteor) {
			$scope.cat = $meteor.object(Cats, '123', false);

			$scope.save = function(cat) {
				var objectToSave;

				try {
					/*
					 * If you had a Meteor method called saveCat(id, cat) and you called it with 
					 * $meteor.call('saveCat', cat._id, cat); it would fail with the same error, 
					 * because it EJSON.stringifies the object before sending it over to the method call.
					 */
					objectToSave = EJSON.stringify(cat);
				} catch (e) {
					$scope.error = e.stack;
				}
				$scope.objectToSave = objectToSave;
			};
		});
}

Cats = new Mongo.Collection('cats');

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (!Cats.find().count()) {
			Cats.insert({
				_id: '123',
				name: 'Paws',
				age: 3
			});
		}
	});
}
