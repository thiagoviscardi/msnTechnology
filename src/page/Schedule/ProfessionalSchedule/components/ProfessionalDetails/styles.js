import { makeStyles, Avatar } from '@material-ui/core';

import styled from 'styled-components';
import appColors from 'utils/appColors';

export const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 760,
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loading_container: {
    width: '100%',
    height: 450,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: '90%',
    marginTop: 33,
    border: '1px solid #E9E9E9',
  },
  button: {
    margin: '25px 0',
    color: appColors.PRIMARY_COLOR,
    textTransform: 'capitalize',
    width: 136,
    height: 32,
    border: `1px solid ${appColors.PRIMARY_COLOR}`,
    fontSize: 12,
  },
  large: {
    width: 104,
    height: 104,
  },
}));

export const TitleDate = styled.div`
  padding: 16px 32px;
  margin: 0px 10px;

  //styleName: Subtitles Desktop / Subtitle 1;
  font-family: 'Open Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  color: ${appColors.SILENCE};

  border-bottom: 1px solid #e9e9e9;
`;

export const AvatarProfessional = styled(Avatar)`
  margin-top: 40px;
  border: 2px solid ${(props) => props.color};
`;

export const ProfessionalName = styled.div`
  margin-top: 24px;

  //styleName: Headers Desktop / Heading 5;
  font-family: 'Open Sans';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.SILENCE};
`;

export const SpecialtiesNames = styled.div`
  margin-top: 8px;

  //styleName: Paragraphs Desktop / P2;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.SILENCE};
`;

export const CompanyName = styled.div`
  margin-top: 24px;
  border: 1px solid #a2a5a8;
  box-sizing: border-box;
  border-radius: 100px;
  width: 144px;
  height: 24px;
  padding: 3px;

  //styleName: Subtitles Desktop / Subtitle 3;
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.CIRURGICAL};
`;

export const UnitName = styled.div`
  margin-top: 8px;

  //styleName: Subtitles Desktop / Subtitle 3;
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.SILENCE};
`;

export const ScaleName = styled.div`
  margin-top: 40px;

  //styleName: Subtitles Desktop / Subtitle 3;
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.CIRURGICAL};
`;

export const TitleCheckin = styled.div`
  margin-top: 32px;

  //styleName: Subtitles Desktop / Subtitle 3;
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.CIRURGICAL};
`;

export const TitleCheckout = styled.div`
  margin-top: 24px;

  //styleName: Subtitles Desktop / Subtitle 3;
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.CIRURGICAL};
`;

export const Time = styled.div`
  margin-top: 8px;

  //styleName: Subtitles Desktop / Subtitle 1;
  font-family: 'Open Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.SILENCE};
`;

export const PrevistTime = styled.div`
  margin-top: 39px;

  //styleName: Paragraphs Desktop / P1;
  font-family: Nunito Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.CIRURGICAL};
`;

export const WorkedHours = styled.div`
  margin-top: 16px;

  //styleName: Paragraphs Desktop / P1;
  font-family: Nunito Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${appColors.PRIMARY_COLOR};
`;
