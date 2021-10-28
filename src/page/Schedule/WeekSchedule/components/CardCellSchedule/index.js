import React, { useContext, memo, useMemo } from 'react';
import CardTooltip from '../CardTooltip';
import { useStyles, LightTooltip } from './styles';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { formatPrice } from 'utils/formatPrice';
import SwitchSituation from '../../../../../shared/component/SwitchSituation';
import CardAddButton from '../CardAddButton';
import CheckIcon from '@material-ui/icons/Check';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Icon } from '@material-ui/core';
import HasPermission from 'utils/checkPermission';

const CardCellSchedule = ({
  item = {},
  index,
  scaleData = {},
  schedule = {},
  agenda = [],
  permissions,
}) => {
  const classes = useStyles();
  const { selectedUnit = {}, handleOpenSchedule = () => {} } = useContext(
    ScheduleWeekPageContext
  );

  const getGroup = (name) => {
    if (!name || name === '') return <span>...</span>;
    return <span>{name}</span>;
  };

  const memoizedValueQuantity = useMemo(() => {
    const quantityAgenda = item?.agenda.length;
    const quantityRemaining = item?.quantity_professional - quantityAgenda;
    return quantityRemaining > 0 ? quantityRemaining : 0;
  }, [item]);

  return (
    <div className={classes.container}>
      {agenda.map((item, index) => (
        <div
          data-cy="container_card_agendamento"
          key={index}
          className={classes.day_cell}
        >
          <CardTooltip
            scaleData={scaleData}
            schedule={schedule}
            selectedUnit={selectedUnit}
            color="#24B8EC"
          >
            <div
              className={classes.div_controler}
              onClick={() => handleOpenSchedule({ item, scaleData })}
            >
              <div>
                <div className={classes.signatureContainer}>
                  <div className={classes.name}>{item?.user.name}</div>
                  {scaleData.signature_required && item?.user?.signature && (
                    <LightTooltip
                      title={
                        item?.user?.signature && (
                          <img
                            alt="signature"
                            style={{ width: 160, height: 85 }}
                            src={item?.user?.signature}
                          />
                        )
                      }
                      placement="top-end"
                    >
                      <Icon
                        data-cy="span_icon_assignment"
                        className={classes.assignmentIcon}
                      >
                        assignment
                      </Icon>
                    </LightTooltip>
                  )}
                </div>

                <div className={classes.specialty}>
                  {getGroup(item?.user?.group?.name)}
                </div>
              </div>
              <div>
                <SwitchSituation item={item} />
                {item?.validated_status && item?.validated_status !== 1 && (
                  <div className={classes.validatedShift}>
                    <CheckIcon className={classes.icon} />
                    Plantão Validado
                  </div>
                )}
              </div>
              <div className={classes.atSightIconContainer}>
                {HasPermission(permissions.value) ? (
                  <div className={classes.value}>
                    Valor: {formatPrice(item?.price <= -1 ? 0 : item?.price)}
                  </div>
                ) : (
                  <></>
                )}

                {item && item.price !== item.price_default && (
                  <LightTooltip
                    title="Valor do plantão alterado"
                    placement=" bottom-e nd"
                  >
                    <Icon style={{ color: '#ffd700' }}>info</Icon>
                  </LightTooltip>
                )}
                {item && item.at_sight === 1 && (
                  <LightTooltip title="Pago à vista" placement="bottom-end">
                    <AttachMoneyIcon className={classes.atSightIcon} />
                  </LightTooltip>
                )}
              </div>
            </div>
          </CardTooltip>
        </div>
      ))}
      {Array(memoizedValueQuantity)
        .fill()
        .map((item, i) => (
          <CardAddButton
            key={i}
            permissions={permissions}
            scaleData={scaleData}
            schedule={schedule}
            agenda={item?.agenda}
            index={index}
          />
        ))}
    </div>
  );
};

export default memo(CardCellSchedule);
