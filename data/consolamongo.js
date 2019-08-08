db.users.insert(
	{
	"_id": ObjectId("5cdc68a7680dd400ad721cb7"),
	"name": "pepe",
	"correo": "pepe@gmail.cl"
	});
db.tasks.insert(
	{"_id" : ObjectId("5cf6d26b29066600ac30b162"),
	"user": ObjectId("5cdc68a7680dd400ad721cb7"),	
	"name" : "Iteración 3",
	"url" : "https://www.youtube.com/watch?v=3uDNrOTYulU&fbclid=IwAR0MpumUbsSheN09UnFmuP1Sn40O19tZzxEzRUCC1FlGs2xo1cEjc2uvCqQ",
	"standard" : "WCAG2AA",
	"ignore" : [ ]
	});

db.results.insert(
	{"_id": ObjectId("def000000000000000000001"),
	"task": ObjectId("5cf6d26b29066600ac30b162"),
	"date": Date.now(),
	"count": {
		"error": 1,
		"warning": 2,
		"notice": 3,
		"total": 6
	},
	"results": ['foo', 'bar']
	});
