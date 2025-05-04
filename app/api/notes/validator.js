const { validate, Validator } = require('app/api/common')
const { body } = validate

class NotesValidator extends Validator {
  async create(req) {
    const validations = [
      body('title').exists().isLength({ min: 1, max: 256 }),
      body('message').exists().isLength({ min: 1 })
    ]
    await this.validate(req, validations)
  }

  async update(req) {
    const validations = [
      body('title').optional().isLength({ min: 1, max: 256 }),
      body('message').optional().isLength({ min: 1 })
    ]
    await this.validate(req, validations)
  }
}

module.exports = new NotesValidator()
