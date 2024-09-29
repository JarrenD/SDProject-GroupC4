document.addEventListener('DOMContentLoaded', function () {
    const specs = {
        safetyResource: 'assets/safetyResource.yaml',
        incidentReporting: 'assets/incidentReporting.yaml',
        emergencyAlert: 'assets/emergencyAlert.yaml',
        notificationServices: 'assets/notificationServices.yaml',
        locationServices: 'assets/locationServices.yaml',
        emergencyContacts: 'assets/contacts.yaml' // New entry for Emergency Contacts
    };

    function renderSwaggerUI(spec, domId) {
        fetch(spec)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // YAML files are text
            })
            .then(yamlText => {
                const specObject = jsyaml.load(yamlText); // Parse YAML to JavaScript object
                SwaggerUIBundle({
                    spec: specObject,
                    dom_id: domId,
                    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
                    layout: 'StandaloneLayout'
                });
            })
            .catch(error => console.error('Error loading the spec:', error));
    }

    // Render each API
    renderSwaggerUI(specs.safetyResource, '#swagger-ui-safety-resource');
    renderSwaggerUI(specs.incidentReporting, '#swagger-ui-incident-reporting');
    renderSwaggerUI(specs.emergencyAlert, '#swagger-ui-emergency-alert');
    renderSwaggerUI(specs.notificationServices, '#swagger-ui-notification-services');
    renderSwaggerUI(specs.locationServices, '#swagger-ui-location-services');
    renderSwaggerUI(specs.emergencyContacts, '#swagger-ui-emergency-contacts'); // Render Emergency Contacts API
});
