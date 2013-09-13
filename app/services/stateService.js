JimsWoods.factory("stateService", function() {
    var currentSlot;
    var currentAnimalFactory;
    var currentAnimal;
    var currentContext;
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

    functions.setCurrentContext = function(context) {
        currentContext = context;
    }

    functions.getCurrentContext = function() {
        return currentContext;
    }
    return {
        functions: functions
    }

})
