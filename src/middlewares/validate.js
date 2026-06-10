import InvariantError from '../exceptions/invariant-error.js';

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });
 
  if (error) {
    const message = error.details.map(d => d.message).join(', ');
    return next(new InvariantError(message));
  }
  req.validated = value;
  next();
};
 
export default validate;