import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  useStyles,
  StyledList,
  InputContainer,
  ChipsContainer,
} from './styles';
import { CircularProgress, Typography } from '@material-ui/core';
import FooterBox from 'page/welcome/components/footerBox';
import SearchInputDebounce from '../SearchInputDebounce';
import ChipFilterHome from '../chipFilterHome';

const CustomUnitsCheckboxes = forwardRef(
  (
    {
      totalUnits = 0,
      loadingUnits = false,
      dataList = [],
      selectedUnits,
      setSelectedUnits,
      getList = () => {},
      onSubmit = () => {},
      handleSearch = () => {},
    },
    ref
  ) => {
    const classes = useStyles();

    const page_ref = useRef(1);
    const [filter, setFilter] = useState({
      page: 1,
      per_page: 20,
      status: 'active',
      search: '',
    });

    const [checked, setChecked] = useState(() => {
      let storageUnits = localStorage.getItem('plantãoExtra@hospital');
      if (storageUnits) {
        storageUnits = JSON.parse(storageUnits);
        return [...storageUnits?.map((item) => item.id)];
      }
      return [];
    });

    const handleToggle = (unit_id, unit) => () => {
      const currentIndex = checked.indexOf(unit_id);
      const newChecked = [...checked];
      const newSelectedUnits = [...selectedUnits];

      if (currentIndex === -1) {
        if (checked?.length < 3) {
          newChecked.push(unit_id);
          newSelectedUnits.push(unit);
        } else {
          newChecked.splice(2, 1);
          newChecked.push(unit_id);
          newSelectedUnits.splice(2, 1);
          newSelectedUnits.push(unit);
        }
      } else {
        newChecked.splice(currentIndex, 1);
        newSelectedUnits.splice(currentIndex, 1);
      }

      setChecked(newChecked);
      setSelectedUnits(newSelectedUnits);
    };

    const onScrollBottom = (event) => {
      const bottom =
        event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
        event.currentTarget.clientHeight;
      const totalPage = Math.ceil(totalUnits / filter?.per_page);
      if (bottom && !loadingUnits && filter?.page < totalPage) {
        const nextPage = page_ref.current + 1;

        setFilter({ ...filter, page: nextPage });
        page_ref.current = nextPage;
      }
      if (event.currentTarget.scrollTop === 0 && filter?.page > 1) {
        let prevPage = page_ref.current - 1;
        prevPage = prevPage > 0 ? prevPage : 1;

        setFilter({ ...filter, page: prevPage });
        page_ref.current = prevPage;
      }
    };

    useEffect(() => {
      getList(filter);
    }, [filter]);

    const handleRemoveAside = (unit_id) => {
      setChecked((old) => [...old.filter((item) => item !== unit_id)]);
      setSelectedUnits((old) => [
        ...old.filter((item) => item?.id !== unit_id),
      ]);
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          handleRemoveAside,
        };
      },
      []
    );

    return (
      <>
        <ChipsContainer>
          {selectedUnits &&
            selectedUnits.length > 0 &&
            selectedUnits.map((item) => (
              <ChipFilterHome
                key={item.id}
                name={item.name}
                id={item.id}
                itemLength={Object.keys(item).length}
                onClick={handleToggle(item?.id, item)}
              />
            ))}
        </ChipsContainer>
        <InputContainer>
          <SearchInputDebounce
            className={classes.inputWidth}
            onChange={handleSearch}
            placeholder="Buscar hospitais"
            style={{
              alignItems: 'center',
              height: 48,
              width: '90%',
            }}
          />
        </InputContainer>
        <StyledList onScroll={(event) => onScrollBottom(event)}>
          {dataList &&
            dataList?.length > 0 &&
            dataList.map((item) => {
              const labelId = `checkbox-list-label-${item?.id}`;
              if (checked.indexOf(item?.id) === -1)
                return (
                  <ListItem
                    key={item?.id}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(item?.id, item)}
                  >
                    <ListItemText id={labelId} primary={`${item?.name}`} />
                  </ListItem>
                );
            })}
        </StyledList>
        <div style={{ minHeight: 20 }}>
          {dataList.length === 0 && filter?.search !== '' && (
            <div className={classes.loadingContainer}>
              <Typography>Nenhum resultado encontrado</Typography>
            </div>
          )}
          {loadingUnits && (
            <div className={classes.loadingContainer}>
              <CircularProgress size={25} color="primary" />
            </div>
          )}
        </div>
        <FooterBox
          setSelectedUnits={setSelectedUnits}
          setChecked={setChecked}
          checked={checked}
          selectedUnits={selectedUnits}
          onSubmit={onSubmit}
        />
      </>
    );
  }
);
export default CustomUnitsCheckboxes;
