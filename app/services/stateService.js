JimsWoods.factory("stateService", function() {
    var currentSlot;
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
    functions.setCurrentSlot = function(slot) {
        currentSlot = slot;
    }

    functions.getCurrentSlot = function() {
        return currentSlot;
    }
    return {
        functions: functions
    }

})
