JimsWoods.factory('arcticAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Killer Whale",
            "description": "blabla",
            "imageURL": "Content/img/killer_whale.png"
        },
        {
            "id": 2,
            "name": "Polar Bear",
            "description": "blabla",
            "imageURL": "Content/img/polar_bear.png"
        },
        {
            "id": 3,
            "name": "Walrus",
            "description": "blabla",
            "imageURL": "Content/img/walrus.png"
        }
    ]
    return {animals:animals};
})