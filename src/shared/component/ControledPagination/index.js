import React from 'react';
import { useStyles, StyledPagination } from './styles';

export default function ControlledPagination({
  total = 1,
  pageByProps,
  perPage = 12,
  loading = false,
  onChange = () => {},
}) {
  const classes = useStyles();
  const qntPages = Math.ceil(total / perPage);
  const [page, setPage] = React.useState(pageByProps || 1);
  const handleChange = (event, value) => {
    setPage(value);
    onChange(value);
  };
  return (
    <>
      {!loading && qntPages > 1 && (
        <div className={classes.root}>
          <StyledPagination
            size="small"
            variant="outlined"
            shape="rounded"
            color="primary"
            count={qntPages}
            page={pageByProps ? pageByProps : page}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
}
