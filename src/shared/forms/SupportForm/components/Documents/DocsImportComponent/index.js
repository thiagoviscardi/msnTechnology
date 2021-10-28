import React, { useEffect } from 'react';
import { useStyles } from './styles';
import DocsHeader from '../DocsHeader';
import SelectedDocs from '../SelectedDocs';
import { useParams } from 'react-router';
import DocsButton from '../DocsButton';
import { useSupportDocuments } from 'hook/Support/documents';
import { CircularProgress } from '@material-ui/core';

export default function DocsImportComponent({
  setDocs = () => {},
  setFieldValue = () => {},
  values = {},
  isEdit = false,
}) {
  const classes = useStyles();
  const { id } = useParams();
  const {
    loading,
    createDocument,
    getDelete: getDeleteDocument,
  } = useSupportDocuments();

  const [localState, setLocalState] = React.useState([]);
  const [localDocName, setLocalDocName] = React.useState(values?.name || '');

  const docsChange = (data) => {
    var dataArray = Object.keys(data).map((key) => data[key]);
    handleUploadFile(dataArray);
  };

  const handleUploadFile = (files) => {
    if (id && id !== ':id') {
      handleCreateDocuments(files).then(() => {
        setLocalState([]);
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
          return createDocument({ id, file }).then((data) => {
            setFieldValue('doc_url', data?.doc_url);
            setLocalDocName(data?.name + ' (atualizado!)');
          });
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
      getDeleteDocument({ id: id, id_document: item.id });
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

      {isEdit && values && values?.doc_url && (
        <div style={{ marginTop: 48 }}>
          <DocsHeader />
          <SelectedDocs
            key={999999}
            item={{
              name: localDocName,
              doc_url: values?.doc_url,
            }}
            deleteDoc={deleteDoc}
          />
        </div>
      )}
    </div>
  );
}
