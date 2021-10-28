export default function Index(mainFilter, dataExchanges, selectedUnit) {
  let HeaderRelatory = '';

  HeaderRelatory += `<div class="divHeader">
      <div class="columnLeft">Unidade</div>
      <div class="columnRight">${selectedUnit?.unit?.name || ''}</div>
    </div>`;

  HeaderRelatory += `<div class="divHeader">
      <div class="columnLeft">Período</div>
      <div class="columnRight">${mainFilter?.date_start} a ${mainFilter?.date_end}</div>
    </div>`;

  HeaderRelatory += '</br>';

  let TableRelatory = '';
  TableRelatory += ` 
      <table style="width:100%; border: none;">
      <tr>
        <th style="width:40%; border: none;">Escala</th>
        <th>Profissional atual</th>
        <th>Profissional anterior</th>
      </tr>
      <tr>
        <td style="width:40%; border: none;">${
          dataExchanges[0].scale?.name || ''
        }</td>
        <td>${dataExchanges[0].user?.name || ''}</td>
        <td>${dataExchanges[0].user_old?.name || ''}</td>
      </tr>  
  `;

  dataExchanges.slice(1).map((item) => {
    TableRelatory += '</table></div>  ';
    TableRelatory += ` 
        <table style="width:100%; border: none;">
        <tr>
          <th style="width:40%; border: none;"></th>
          <th></th>
        </tr>
        <tr>
          <td  style="width:40%; border: none;">${item.scale?.name || ''}</td>
          <td>${item.user?.name || ''}</td>
          <td>${item.user_old?.name || ''}</td>
        </tr>  
        `;
  });

  TableRelatory += '</table>';

  const Style = `
    <style>
      table {
        font-family: Roboto, sans-serif;
        border: none;
        width: 100%;
      }
  
      td, th {
        border: none;
        text-align: left;
        padding: 5px 3px;
      }
  
      tr:nth-child(even) {
        background-color: rgba(70, 130, 180, 0.1);
        box-shadow: 0 0 0 1000px #DBEEF4 inset;
      }
  
      .divHeader {
        display: flex; width: 100%; margin-bottom: 5px; min-height: 40px; font-size: 20px; font-weight: bold; color: #18191A;
      }

      .columnLeft {
        width: 40%; background-color: #2aabe2; box-shadow: 0 0 0 1000px #2aabe2 inset; text-align: center; color: #18191A; padding-top: 5px; color: #18191A;
      }
  
      .columnRight {
        width: 60%; background-color: #DBEEF4; box-shadow: 0 0 0 1000px #DBEEF4 inset; text-align: center; color: #18191A; padding-top: 5px;
      }

      .divHeader2 {
        display: flex; width: 100%; margin-bottom: 5px; min-height: 20; font-size: 16px; font-weight: bold; color: #18191A;
      }
      
      .columnLeft2 {
        width: 40%; background-color: #E4E4E7; box-shadow: 0 0 0 1000px #E4E4E7 inset; text-align: center; padding-top: 5px; color: #18191A;
      }
  
      .columnRight2 {
        width: 60%; background-color: #E4E4E7; box-shadow: 0 0 0 1000px #E4E4E7 inset; text-align: center; color: #18191A; padding-top: 5px;
      }
    </style>`;

  const bodyContent = HeaderRelatory + TableRelatory + Style;
  return bodyContent;
}
