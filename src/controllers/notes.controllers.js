import Note from '../models/notes.js';

// Define the NoteController object that will hold all the functions to handle the requests
// The functions will be called from the routes
const NoteController = {
    async getNotes(req, res) {
        try {
            const notes = await Note.findAll();
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getNoteById(req, res) {
        const { id } = req.params;
        try {
            const note = await Note.findByPk(id);
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createNotes(req, res) {
        const { title, content } = req.body;
        try {
            const newNote = await Note.create({ title, content });
            res.status(201).json(newNote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateNotes(req, res) {
        const { id } = req.params;
        const { title, content, isArchived } = req.body;
        try {
            const note = await Note.update(
                { title, content, isArchived },
                { where: { id } }
            );
            res.json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteNotes(req, res) {
        const { id } = req.params;
        try {
            await Note.destroy({ where: { id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default NoteController;