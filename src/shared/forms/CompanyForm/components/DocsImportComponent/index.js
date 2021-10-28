import React, { useEffect } from 'react';
import { useStyles } from './styles';
import DocsHeader from '../DocsHeader';
import SelectedDocs from '../SelectedDocs';
import { useParams } from 'react-router';
import DocsButton from '../DocsButton';
import { useUnitDocuments } from 'hook/units/documents';
import { CircularProgress } from '@material-ui/core';

const params = { page: 1, per_page: 24 };

export default function DocsImportComponent({ setDocs = () => {} }) {
  const classes = useStyles();
  const { id } = useParams();
  const {
    data: documentsList,
    loading,
    getDocuments,
    createDocument,
    deleteloading,
    getDelete: getDeleteDocument,
  } = useUnitDocuments();

  const [localState, setLocalState] = React.useState([]);

  const docsChange = (data) => {
    var dataArray = Object.keys(data).map((key) => data[key]);
    handleUploadFile(dataArray);
  };

  const handleUploadFile = (files) => {
    if (id && id !== ':id') {
      handleCreateDocuments(files).then(() => {
        getDocuments({ id }, params);
      });
    } else {
      setLocalState((oldState) => [...oldState, ...files]);
    }
  };

  const handleCreateDocuments = (files) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      try {
        const responseUpload = files.map(async (file) => {
          return createDocument({ id_unit: id, file });
        });

        await Promise.all(responseUpload);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

  const deleteDoc = (item) => () => {
    if (id && id !== ':id') {
      setLocalState((oldState) => [
        ...oldState.filter((doc) => doc.id !== item.id),
      ]);
      getDeleteDocument({ id_unit: id, id_document: item.id });
    } else {
      setLocalState((oldState) => [
        ...oldState.filter((doc) => doc.name !== item.name),
      ]);
    }
  };

  useEffect(() => {
    if (id === ':id' || !id) {
      setDocs(localState);
    }
  }, [localState]);

  useEffect(() => {
    if (id && id !== ':id' && !deleteloading) {
      setLocalState(documentsList);
    }
  }, [documentsList]);

  useEffect(() => {
    if (id && id !== ':id') {
      getDocuments({ id }, params);
    }
  }, []);

  return (
    <div>
      <div className={classes.container_button}>
        <DocsButton
          name="doc"
          docsChange={docsChange}
          setFieldValue={() => {}}
        />

        {loading && (
          <CircularProgress
            style={{ marginLeft: 30 }}
            color="primary"
            size={30}
          />
        )}
      </div>

      {localState && localState?.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <div className={classes.columnContainer}>
            <DocsHeader />
            {localState.map((item, index) => (
              <SelectedDocs
                key={index}
                // openPdf={openPdf(item)}
                item={item}
                deleteDoc={deleteDoc}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
