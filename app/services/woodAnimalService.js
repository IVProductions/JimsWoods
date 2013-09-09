JimsWoods.factory('woodAnimalFactory',function() {
    var animals = [
        {
            "id": 1,
            "name": "Dog",
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats."
        },
        {
            "id": 2,
            "name": "Cat",
            "description": "Cats are stuck up and really lame. All they care about is food and naps."
        },
        {
            "id": 3,
            "name": "Parrot",
            "description": "Parrots are fucking useless!"
        }
    ]
    return {animals:animals};
})