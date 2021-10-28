/// <reference types="cypress" />

function adicionarMedicoAoPlantao (tokenUsuarioLogado, scheduleId, scaleId, day, unitId, professionalId, scale_hour_end, scale_hour_start) {

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v1/agendas/create_agenda`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
            "hour_end": scale_hour_end,
            "hour_start": scale_hour_start,
            "price": 1000,
            "scale": {"id": scaleId},
            "schedule": {"id": scheduleId},
            "selectedDays": [{"id": 0, "date_start": day, "date_end": day}],
            "unit": {"id": unitId},
            "user": {"id": professionalId}
        },
        failOnStatusCode: false    
    })

}

export {adicionarMedicoAoPlantao}