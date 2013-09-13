JimsWoods.factory('fableAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Dragon",
            "description": "blabla",
            "imageURL": "Content/img/dragon.png"
        },
        {
            "id": 2,
            "name": "BearPigMan",
            "description": "blabla",
            "imageURL": "Content/img/bear_pig_man.png"
        },
        {
            "id": 3,
            "name": "Hydra",
            "description": "blabla",
            "imageURL": "Content/img/hydra.png"
        }
    ]
    return {animals:animals};
})