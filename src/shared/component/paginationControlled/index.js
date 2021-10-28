import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginLeft: 5,
  },
}));

export default function PaginationControlled({
  total = 1,
  perPage = 12,
  loading = false,
  onChange = () => {},
}) {
  const classes = useStyles();
  const qntPages = Math.ceil(total / perPage);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    onChange(value);
  };

  return (
    <>
      {!loading && qntPages > 1 && (
        <div className={classes.root}>
          <Pagination
            size="small"
            variant="outlined"
            shape="rounded"
            color="primary"
            count={qntPages}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
}
