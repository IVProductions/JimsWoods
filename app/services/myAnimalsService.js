JimsWoods.factory('myAnimalFactory',function() {
    var animals = [
        {
            "id": 6,
            "name": "Fox",
            "description": "blabla",
            "imageURL": "Content/img/tiger.png"
        },
        {
            "id": 7,
            "name": "Lepard",
            "description": "blabla",
            "imageURL": "Content/img/crocodile.png"
        },
        {
            "id": 8,
            "name": "Snake",
            "description": "blabla",
            "imageURL": "Content/img/orangutang.png"
        }
    ]
    return {animals:animals};
})