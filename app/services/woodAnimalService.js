JimsWoods.factory('woodAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Dog",
            "health": 50,
            "attack": 45,
            "defence": 75,
            "speed": 50,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 2,
            "name": "Cat",
            "health": 123,
            "attack": 123,
            "defence": 24,
            "speed": 90,
            "description": "Cats are stuck up and really lame. All they care about is food and naps.",
            "imageURL": "Content/img/cat.png"
        },
        {
            "id": 3,
            "name": "Parrot",
            "health": 123,
            "attack": 123,
            "defence": 24,
            "speed": 90,
            "description": "Parrots are fucking useless!",
            "imageURL": "Content/img/parrot.png"
        }
    ]
    return {animals:animals};
})