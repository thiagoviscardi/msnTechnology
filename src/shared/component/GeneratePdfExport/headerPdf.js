/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
import logoPdf from './logoPdf';
import appColors from 'utils/appColors';

export default function Index(title = '') {
  const headerContent = `
    <div style="display: flex; justify-content: space-between; align-items: center; color: white;">   
      ${logoPdf()}
    </div>
    <div style="
      background-color: ${appColors.SECUNDARY_COLOR};
      
      box-shadow: 0 0 0 1000px ${appColors.SECUNDARY_COLOR} inset;
      margin-top: 15px;
      color: white;
      padding: 5px;
      font-size: 17px;
      text-align: center;">
        <strong  style="
          color: white;
        ">
          ${title}
        </strong>
    </div>`;
  return headerContent;
}
