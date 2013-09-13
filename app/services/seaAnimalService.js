JimsWoods.factory('seaAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Dolphin",
            "description": "blabla",
            "imageURL": "Content/img/dolphin.png"
        },
        {
            "id": 2,
            "name": "Blue Marlin",
            "description": "blabla",
            "imageURL": "Content/img/blue_marlin.png"
        },
        {
            "id": 3,
            "name": "Salmon",
            "description": "blabla",
            "imageURL": "Content/img/salmon.png"
        }
    ]
    return {animals:animals};
})