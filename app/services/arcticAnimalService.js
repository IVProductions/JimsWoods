JimsWoods.factory('arcticAnimalFactory',function() {
    var animals = [
        {
            "id": 120,
            "name": "Dolphin",
            "health": 60,
            "attack": 65,
            "defence": 70,
            "speed": 75,
            "description": "blabla",
            "imageURL": "Content/img/dolphin.png"
        },
    ]
    return {animals:animals};
})