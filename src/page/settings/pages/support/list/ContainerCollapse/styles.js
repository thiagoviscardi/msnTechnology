import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginLeft: 50,
    minHeight: 100,
  },
  text_title: {
    textAlign: 'left',
    color: '#BBBDBF',
    fontSize: 12,
    fontWeight: 400,
    marginTop: 5,
  },
  no_document: {
    textAlign: 'left',
    color: '#505255',
    fontSize: 16,
    fontWeight: 400,
  },
  docStyle: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 60,
  },
  docsText: {
    marginLeft: 10,
  },
  icon_file: { color: appColors.PRIMARY_COLOR, fontSize: 19 },
  link_button: { textDecoration: 'none', color: appColors.PRIMARY_COLOR },
}));

export const DocsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 60%;
  margin-top: 16px;
`;
