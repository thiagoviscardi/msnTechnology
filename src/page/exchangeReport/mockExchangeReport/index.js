const data = [
  {
    id: 1,
    name: 'Nome',
    specialty: 'Oncologia',
    schedule: '22/06 (DOM) 07h30 ás 20h30 ',
    type: 'Cancelada',
    situation_status: 3,
    avatar: '',
    crm: '4242-GO',
    company: 'Medical Center',
    hospital:
      'HUGOL - Hospital Estadual de Urgências Governador Otávio Lage de Siqueira',
    contact: 'drabetina-onco@sampleemail.com',
  },
  {
    id: 2,
    name: 'lucas',
    specialty: 'Pediatra',
    schedule: '22/06 (DOM) 07h30 ás 20h30 ',
    type: 'Aguardando',
    situation_status: 6,
    avatar: '',
    crm: '4242-GO',
    company: 'Medical Center',
    hospital:
      'HUGOL - Hospital Estadual de Urgências Governador Otávio Lage de Siqueira',
    contact: 'drabetina-onco@sampleemail.com',
  },
  {
    id: 3,
    name: 'reidner',
    specialty: 'dentista',
    schedule: '22/06 (DOM) 07h30 ás 20h30 ',
    type: 'Trocado',
    situation_status: 2,
    avatar: '',
    crm: '4242-GO',
    company: 'Medical Center',
    hospital:
      'HUGOL - Hospital Estadual de Urgências Governador Otávio Lage de Siqueira',
    contact: 'drabetina-onco@sampleemail.com',
  },
];

const BuscarDados = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 4000);
  });
};
export default BuscarDados;
