import Immutable from 'seamless-immutable';
import moment from 'moment';
import 'moment/locale/pt-br';

const toPrice = (val) => Number(val).toFixed(2).replace('.', ',');

const toMutable = (data) => {
  return Immutable.asMutable(data, { deep: true });
};

const formatCityName = (cityData) => {
  return cityData.map((cityInfo) => {
    return {
      id: cityInfo.id,
      name: `${cityInfo.name} - ${cityInfo.state.name}`,
    };
  });
};

const formatBankName = (bankData) => {
  return bankData.map((bankInfo) => {
    return {
      id: bankInfo.id,
      name: `${bankInfo.code} - ${bankInfo.name}`,
    };
  });
};

const formatPaymentType = (paymentType) => {
  const paymentTypeInt = Number(paymentType);
  if (paymentTypeInt === 1) {
    return 'Cartão';
  }
  if (paymentTypeInt === 2) {
    return 'Boleto';
  }
  return '';
};

const formatStoresName = (stores) => {
  const storesNames = [];
  if (stores) {
    stores.forEach((store) => {
      if (store.store) {
        storesNames.push(store.store.name);
      }
    });
    return storesNames.join(', \n');
  }
  return '';
};

const formatDate = (date, formatedDate = '') => {
  moment.locale('pt-br');
  return moment(date, formatedDate).format('DD/MM/YYYY HH:mm');
};

const formatDate2 = (date, formatedDate) => {
  return moment.utc(date, formatedDate).format('DD/MM/YYYY');
};
const formatDate3 = (date, formatedDate = '') => {
  moment.locale('pt-br');
  return moment(date, formatedDate).format('DD/MM HH:mm');
};

const formatDateHour = (date, formatedDate = '') => {
  moment.locale('pt-br');
  return moment(date, formatedDate).format('HH:mm');
};

const formatStatus = (status) => {
  const validStatus = {
    0: 'Aguardando Pagamento',
    1: 'Pagamento Autorizado',
    2: 'Faturado Parcialmente',
    3: 'Faturado',
    4: 'Em Separação',
    5: 'Aguardando Envio',
    6: 'Enviado',
    7: 'Entregue / Concluído',
    8: 'Entregue Parcialmente',
    9: 'Aguardando Retirada',
    10: 'Devolvido',
    11: 'Devolvido Parcialmente',
    98: 'Não autorizado / Pagamento Recusado',
    99: 'Cancelado',
  };
  return validStatus[status];
};

const imageToBase64 = (image) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(image);
    } catch (ex) {
      reject(ex);
    }
  });
};

export {
  toMutable,
  toPrice,
  formatCityName,
  formatBankName,
  formatPaymentType,
  formatStoresName,
  formatDate,
  formatDate2,
  formatDate3,
  formatDateHour,
  formatStatus,
  imageToBase64,
};
