import ClientError from '../exceptions/client-error.js';
 
class InvariantError extends ClientError {
  constructor(message) {
    super(message, 400);
    this.name = 'InvariantError';
  }
}
 
export default InvariantError;
