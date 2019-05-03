const Joi = require('joi');
const HttpResponse = require('../helper/http-response');

/***
 * checking req.body payload and convert to object which have properties are define ind ruleObjectSchema
 * - throw httpResponseError with status 400 bad request if invalid object
 * - inject object to req: req[key]=parsedObject;
 * @param rulesObjectSchema: joi object schema
 * @key string: the key of object is injected to request
 * @returns {Promise<void>}
 */
module.exports = (rulesObjectSchema, key) => {
    return async (req, res, next) => {
        const keys = Object.keys(rulesObjectSchema);

        let $obj = {};
        keys.forEach(keyItem => {
            $obj[keyItem] = req.body[keyItem]
        });


        const {error, value} = Joi.validate($obj, rulesObjectSchema);
        if (error) {
            return next(new HttpResponse(400).withData(error).withErrorMessage('Dữ liệu không hợp lệ'));
        }
        req[key] = $obj;
        next();
    }
};
