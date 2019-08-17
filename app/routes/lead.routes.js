module.exports = (app) => {
    const leads = require('../controllers/lead.controller.js');

    // Create a new Lead
    app.post('/api/leads', leads.create);

    // Retrieve all Leads
    app.get('/api/leads', leads.findAll);

    // Retrieve a single Lead with leadId
    app.get('/api/leads/:leadId', leads.findOne);

    // Update a Lead with leadId
    app.put('/api/leads/:leadId', leads.update);

    // Delete a Lead with leadId
    app.delete('/api/leads/:leadId', leads.delete);
}