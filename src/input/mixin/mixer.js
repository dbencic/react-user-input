module.exports = function(instance, allMethods, methodsToBind) {

    if (!methodsToBind) methodsToBind = Object.getOwnPropertyNames(allMethods);
    
    methodsToBind.forEach((methodName)=>{
        var f = allMethods[methodName];
        instance[methodName] = f.bind(instance);
    });
};