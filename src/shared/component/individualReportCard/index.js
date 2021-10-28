import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import { useStyles, StyledIndividualReportCard } from './styles';
import appColors from 'utils/appColors';

const IndividualReportCard = ({
  title,
  quantity,
  type,
  icon,
  colorIcon,
  situation,
  situationStatus,
}) => {
  const classes = useStyles();
  return (
    <StyledIndividualReportCard elevation={0}>
      {type === 'allScale' ? (
        <Icon style={{ fontSize: 50 }}>insert_chart_outlined</Icon>
      ) : (
        <>
          <Typography
            data-cy="container_cards_btn_qtd"
            className={classes.qtdText}
          >
            {quantity}
          </Typography>
          <div className={classes.rowContainer}>
            {icon && (
              <Icon style={{ marginRight: 16, color: colorIcon }}>{icon}</Icon>
            )}
            {situation === 1 && situationStatus === 4 && (
              <Icon style={{ color: appColors.PRIMARY_COLOR }}>done_all</Icon>
            )}
            {situation === 1 && situationStatus === 3 && (
              <Icon style={{ color: 'green' }}>av_timer</Icon>
            )}
            {situation === 1 && situationStatus === 2 && (
              <Icon style={{ color: 'blue' }}>query_builder</Icon>
            )}
            {situation === 1 && situationStatus === 1 && (
              <Icon style={{ color: 'orange' }}>warning</Icon>
            )}
            {situation === 1 && situationStatus === 5 && (
              <Icon style={{ color: 'red' }}>block</Icon>
            )}
            {situation === 1 && situationStatus === 6 && (
              <Icon style={{ color: 'pink' }}>outlined_flag</Icon>
            )}
            {title.length > 30 ? (
              <>
                {type === 'dayScale' ? (
                  <Typography
                    style={{ fontSize: 18, fontWeight: 400 }}
                    className={classes.title}
                  >
                    {title.substring(0, 30)}...
                  </Typography>
                ) : (
                  <Typography className={classes.title}>{title}</Typography>
                )}
              </>
            ) : (
              <>
                {type === 'dayScale' ? (
                  <Typography
                    style={{ fontSize: 18, fontWeight: 400 }}
                    className={classes.title}
                  >
                    {title}
                  </Typography>
                ) : (
                  <Typography className={classes.title}>{title}</Typography>
                )}
              </>
            )}
          </div>
        </>
      )}
      {type === 'dayScale' && (
        <Typography className={classes.show}>
          ver todos em andamento {'>'}
        </Typography>
      )}
      {type === 'shift' && (
        <Typography className={classes.show}>ver relatórios {'>'}</Typography>
      )}
      {type === 'allScale' && (
        <Typography className={classes.show}>
          Ver todos os plantões {'>'}
        </Typography>
      )}
    </StyledIndividualReportCard>
  );
};

export default IndividualReportCard;
