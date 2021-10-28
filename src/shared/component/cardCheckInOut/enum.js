export const SITUATION_STATUS = {
  SHEDULED: 12,
  IN_PROGRESS: 13,
  COMPLETED: 14,
  LANCADO: 21,
  EXCHANGE_COMPLETED: 34,
  EXCHANGE_SHEDULED: 32,
  EXCHANGE_IN_PROGRESS: 33,
};
// mudar os situation_status para os usados
const statusNames = {
  [SITUATION_STATUS.SHEDULED]: 'Agendado',
  [SITUATION_STATUS.IN_PROGRESS]: 'Em progresso',
  [SITUATION_STATUS.COMPLETED]: 'Completo',
  [SITUATION_STATUS.LANCADO]: 'Lancado',
  [SITUATION_STATUS.EXCHANGE_COMPLETED]: 'Trocado realizado',
  [SITUATION_STATUS.EXCHANGE_SHEDULED]: 'Trocado agendado',
  [SITUATION_STATUS.EXCHANGE_IN_PROGRESS]: 'Trocado ocorrendo',
};

export const getStatusName = (situation_code) => statusNames[situation_code];
