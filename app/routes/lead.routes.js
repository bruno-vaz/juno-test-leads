module.exports = (app) => {
    const leads = require('../controllers/lead.controller.js');

    // Create a new Lead
    app.post('/leads', leads.create);

    // Retrieve all Leads
    app.get('/leads', leads.findAll);

    // Retrieve a single Lead with leadId
    app.get('/leads/:leadId', leads.findOne);

    // Update a Lead with leadId
    app.put('/leads/:leadId', leads.update);

    // Delete a Lead with leadId
    app.delete('/leads/:leadId', leads.delete);
}