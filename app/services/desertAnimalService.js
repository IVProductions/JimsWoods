JimsWoods.factory('desertAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Elephant",
            "description": "blabla",
            "imageURL": "Content/img/elephant.png"
        },
        {
            "id": 2,
            "name": "Cheetah",
            "description": "blabla",
            "imageURL": "Content/img/cheetah.png"
        },
        {
            "id": 3,
            "name": "Zebra",
            "description": "blabla",
            "imageURL": "Content/img/zebra.png"
        }
    ]
    return {animals:animals};
})