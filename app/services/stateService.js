JimsWoods.factory("stateService", function() {
    var currentAnimalFactory;
    var currentAnimal;
    var functions = {};
    functions.setCurrentAnimalFactory = function(factory) {
        currentAnimalFactory = factory.animals;
    }

    functions.getCurrentAnimalFactory = function() {
        return currentAnimalFactory;
    }
    functions.setCurrentAnimal = function(animal) {
        currentAnimal = animal;
    }

    functions.getCurrentAnimal = function() {
        return currentAnimal;
    }

    return {
        functions: functions
    }
})
