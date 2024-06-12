import React, { useCallback, useEffect, useRef, useState } from "react";
import Document, { IDocument } from "@/components/Document/Document";
import Button from "../Button/Button";
import styles from "./styles.module.scss";
import LoaderSearch from "../LoaderSearch/LoaderSearch";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectAccessToken } from "@/lib/features/selectors/authSelectors";
import { selectDocumentsIDs } from "@/lib/features/selectors/documentsSelectors";
import getDocuments from "@/api/getDocuments";

const Documents: React.FC = () => {
  const accessToken = useAppSelector(selectAccessToken);
  const documentsIDs = useAppSelector(selectDocumentsIDs);

  const [countDocuments, setCountDocuments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const limit = 10;
  const countDocumentsPlusLimit = countDocuments + limit;

  const [documents, setDocuments] = useState<IDocument[]>([]);

  const loadMoreDocuments = useCallback(async () => {
    const sliceFrom = countDocuments;
    const sliceTo =
      documentsIDs.ids.length < countDocumentsPlusLimit
        ? documentsIDs.ids.length
        : countDocumentsPlusLimit;

    await getDocuments(
      { ids: documentsIDs.ids.slice(sliceFrom, sliceTo) },
      accessToken
    ).then((res) => {
      setCountDocuments(sliceTo);
      setDocuments((prev) => [...prev, ...res]);
      setLoading(false);
    });
  }, [accessToken, countDocuments, countDocumentsPlusLimit, documentsIDs.ids]);

  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadMoreDocuments();
    }
  }, [loadMoreDocuments, countDocuments]);

  if (documents.length === 0) {
    return <LoaderSearch />;
  }

  return (
    <>
      <section className={styles.documents}>
        <h2 className={styles.documents__title}>Список документов</h2>
        <div className={styles.documents__wrapper}>
          {documents.map((document, index) => (
            <Document key={index} ok={document.ok} />
          ))}
        </div>
        {documents.length < documentsIDs.ids.length && (
          <Button
            maxWidth="305"
            loading={loading}
            onClick={() => {
              setLoading(true);
              loadMoreDocuments();
            }}
          >
            Показать больше
          </Button>
        )}
      </section>
    </>
  );
};

export default Documents;
