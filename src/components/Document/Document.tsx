import Link from "next/link";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import formatDate, {
  formatNumberWithSpacesAndSuffixForDocument,
  parseXmlContent,
} from "@/lib/utils/utils";

export interface IDocument {
  ok: {
    attributes: {
      wordCount: number;
      isTechNews: boolean;
      isAnnouncement: boolean;
      isDigest: boolean;
    };
    content: {
      markup: string;
    };
    source: {
      name: string;
    };
    title: {
      text: string;
    };
    issueDate: string;
    url: string;
  };
}

const Document: React.FC<IDocument> = ({ ok }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refImage = useRef<HTMLDivElement | null>(null);

  const nodes = parseXmlContent(ok.content?.markup);

  useEffect(() => {
    if (ref.current) {
      nodes.textNodes.forEach((child) => {
        ref.current?.append(child);
      });
    }
    if (refImage.current && nodes.image) {
      refImage.current?.append(nodes.image);
    }
  }, [nodes]);

  return (
    <div className={styles.document}>
      <div className={styles.document__top}>
        <span className={styles.document__date}>
          {formatDate(ok.issueDate)}
        </span>
        <Link
          className={styles.document__source}
          href={`${ok.url}`}
          target="_blank"
        >
          {ok.source?.name}
        </Link>
      </div>
      <div className={styles.document__title}>{ok.title?.text}</div>
      {ok.attributes?.isAnnouncement && (
        <span className={styles.document__category}>Анонсы и события</span>
      )}
      {ok.attributes?.isDigest && (
        <span className={styles.document__category}>Дайджест</span>
      )}
      {ok.attributes?.isTechNews && (
        <span className={styles.document__category}>Технические новости</span>
      )}

      {nodes.image && (
        <div ref={refImage} className={styles.document__image}></div>
      )}

      <div className={styles.document__description} ref={ref}></div>

      <div className={styles.document__footer}>
        <Link
          href={`${ok.url}`}
          target="_blank"
          className={styles.document__readsource}
        >
          Читать в источнике
        </Link>
        <span className={styles.document__countwords}>
          {formatNumberWithSpacesAndSuffixForDocument(ok.attributes?.wordCount)}
        </span>
      </div>
    </div>
  );
};

export default Document;
