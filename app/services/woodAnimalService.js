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
            "health": 50,
            "attack": 45,
            "defence": 75,
            "speed": 50,
            "description": "Cats are stuck up and really lame. All they care about is food and naps.",
            "imageURL": "Content/img/cat.png"
        },
        {
            "id": 3,
            "name": "Parrot",
            "health": 55,
            "attack": 65,
            "defence": 45,
            "speed": 55,
            "description": "Parrots are fucking useless!",
            "imageURL": "Content/img/parrot.png"
        },
        {
            "id": 4,
            "name": "Cow",
            "health": 5,
            "attack": 5,
            "defence": 5,
            "speed": 5,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 5,
            "name": "Rabbit",
            "health": 10,
            "attack": 10,
            "defence": 15,
            "speed": 15,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 6,
            "name": "Otter",
            "health": 20,
            "attack": 20,
            "defence": 10,
            "speed": 10,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 7,
            "name": "Pigeon",
            "health": 15,
            "attack": 15,
            "defence": 10,
            "speed": 20,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 8,
            "name": "Owl",
            "health": 10,
            "attack": 20,
            "defence": 20,
            "speed": 10,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 9,
            "name": "Duck",
            "health": 10,
            "attack": 35,
            "defence": 10,
            "speed": 5,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 10,
            "name": "Snail",
            "health": 30,
            "attack": 15,
            "defence": 15,
            "speed": 3,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 11,
            "name": "Squirrel",
            "health": 10,
            "attack": 35,
            "defence": 10,
            "speed": 10,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 12,
            "name": "Crow",
            "health": 10,
            "attack": 25,
            "defence": 10,
            "speed": 20,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 13,
            "name": "Guinea pig",
            "health": 10,
            "attack": 45,
            "defence": 10,
            "speed": 10,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 14,
            "name": "Raccoon",
            "health": 20,
            "attack": 20,
            "defence": 20,
            "speed": 20,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 15,
            "name": "Beaver",
            "health": 25,
            "attack": 25,
            "defence": 25,
            "speed": 25,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 16,
            "name": "Frog",
            "health": 25,
            "attack": 30,
            "defence": 20,
            "speed": 25,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 17,
            "name": "Pig",
            "health": 40,
            "attack": 15,
            "defence": 40,
            "speed": 10,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 18,
            "name": "Deer",
            "health": 35,
            "attack": 10,
            "defence": 40,
            "speed": 20,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 19,
            "name": "Swan",
            "health": 40,
            "attack": 35,
            "defence": 20,
            "speed": 15,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 20,
            "name": "Porcupine",
            "health": 30,
            "attack": 25,
            "defence": 35,
            "speed": 20,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 21,
            "name": "Raven",
            "health": 20,
            "attack": 30,
            "defence": 20,
            "speed": 50,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 22,
            "name": "Viper",
            "health": 35,
            "attack": 40,
            "defence": 15,
            "speed": 35,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 23,
            "name": "Skunk",
            "health": 45,
            "attack": 30,
            "defence": 40,
            "speed": 15,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 24,
            "name": "Horse",
            "health": 35,
            "attack": 40,
            "defence": 10,
            "speed": 50,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 25,
            "name": "Lynx",
            "health": 40,
            "attack": 50,
            "defence": 50,
            "speed": 40,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 26,
            "name": "Fox",
            "health": 40,
            "attack": 60,
            "defence": 40,
            "speed": 50,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 27,
            "name": "Moose",
            "health": 75,
            "attack": 40,
            "defence": 60,
            "speed": 35,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 28,
            "name": "Wasp",
            "health": 50,
            "attack": 80,
            "defence": 40,
            "speed": 50,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 29,
            "name": "Wolf",
            "health": 70,
            "attack": 70,
            "defence": 70,
            "speed": 70,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        },
        {
            "id": 30,
            "name": "Brown bear",
            "health": 75,
            "attack": 95,
            "defence": 75,
            "speed": 55,
            "description": "The dog is man's best friends. Always loyal to their owner, unlike cats.",
            "imageURL": "Content/img/dog.png"
        }
    ]
    return {animals:animals};
})