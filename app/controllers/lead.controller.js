const Lead = require('../models/lead.model.js');

// Create and Save a new Lead
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Lead e-mail can not be empty"
        });
    }

    // Create a Lead
    const lead = new Lead({
        name: req.body.name, 
        email: req.body.email
    });

    // Save Lead in the database
    lead.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Lead."
        });
    });
};

// Retrieve and return all leads from the database.
exports.findAll = (req, res) => {
    Lead.find()
    .then(leads => {
        res.send(leads);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving leads."
        });
    });
};

// Find a single lead with a leadId
exports.findOne = (req, res) => {
    Lead.findById(req.params.leadId)
    .then(lead => {
        if(!lead) {
            return res.status(404).send({
                message: "Lead not found with id " + req.params.leadId
            });            
        }
        res.send(lead);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lead not found with id " + req.params.leadId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving lead with id " + req.params.leadId
        });
    });
};

// Update a lead identified by the leadId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Lead e-mail can not be empty"
        });
    }

    // Find lead and update it with the request body
    Lead.findByIdAndUpdate(req.params.leadId, {
        name: req.body.name,
        email: req.body.email
    }, {new: true})
    .then(lead => {
        if(!lead) {
            return res.status(404).send({
                message: "Lead not found with id " + req.params.leadId
            });
        }
        res.send(lead);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lead not found with id " + req.params.leadId
            });                
        }
        return res.status(500).send({
            message: "Error updating lead with id " + req.params.leadId
        });
    });
};

// Delete a lead with the specified leadId in the request
exports.delete = (req, res) => {
    Lead.findByIdAndRemove(req.params.leadId)
    .then(lead => {
        if(!lead) {
            return res.status(404).send({
                message: "Lead not found with id " + req.params.leadId
            });
        }
        res.send({message: "Lead deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Lead not found with id " + req.params.leadId
            });                
        }
        return res.status(500).send({
            message: "Could not delete lead with id " + req.params.leadId
        });
    });
};
