const situtationStatus = {
  // Plantões que foram agendados por um gerente e lançados para o usuário
  PLANTAO_ESCALADO: 12,
  PLANTAO_OCORRENDO: 13,
  PLANTAO_REALIZADO: 14,
  PLANTAO_SOLICITADO_PELO_USUARIO: 17,

  // Plantões que foram enviados para um colega
  PLANTAO_ESCALADO_ENVIADO_PARA_COLEGA: 21,

  // Plantões que foram recebidos de um colega na unidade
  PLANTAO_TROCADO_ESCALADO: 32,
  PLANTAO_TROCADO_OCORRENDO: 33,
  PLANTAO_TROCADO_REALIZADO: 34,
  PLANTAO_RECEBIDO_DE_COLEGA_E_RECUSADO: 35,
};

export default situtationStatus;
