const notesService = require('app/modules/notes')

/**
 * @method getUserNotes
 */
exports.getUserNotes = async (req, res) => {
  const notes = await notesService.find({ userId: req.params.id })
  res.status(200).send(notes)
}

/**
 * @method create
 */
exports.create = async (req, res) => {
  const note = await notesService.create({
    title: req.body.title,
    message: req.body.message,
    userId: req.body.userId
  })
  res.status(201).send(note)
}
