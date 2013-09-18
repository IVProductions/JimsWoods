JimsWoods.factory('mountainAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Tiger",
            "description": "blabla",
            "imageURL": "Content/img/tiger.png"
        },
        {
            "id": 2,
            "name": "Crocodile",
            "description": "blabla",
            "imageURL": "Content/img/crocodile.png"
        },
        {
            "id": 3,
            "name": "Orangutang",
            "description": "blabla",
            "imageURL": "Content/img/orangutang.png"
        }
    ]
    return {animals:animals};
})