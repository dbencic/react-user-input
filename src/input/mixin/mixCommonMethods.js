import parsers from "../../parsers";
import mixer from "./mixer";

var getIsError = function(value, mandatory) {
    return parsers.haveParsingFailed(value) || (!value && mandatory);
};

var methods = {getIsError};

/**
 * adds common event methods
 */
module.exports = function(instance, methodsToBind) {
    if (!instance) throw new Error("instance (first argument). Cannot be null. Methods should be bound to it");

    mixer(instance, methods, methodsToBind);
};