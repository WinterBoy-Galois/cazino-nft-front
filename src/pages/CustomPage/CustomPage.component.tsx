import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import Layout from '../../components/Layout';
import Page404 from '../Page404';
import styles from './CustomPage.module.scss';
import gfm from 'remark-gfm';

const defaultLanguage = 'en';

interface Props extends RouteComponentProps {
  fileName: string;
  raw?: boolean;
}

export const CustomPageComponent: React.FC<Props> = ({ fileName, raw }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState<string | null>('');

  useEffect(() => {
    try {
      if (!fileName) {
        return;
      }
      setError(false);
      const file =
        require(`./pages/${fileName}/${language}.md`).default ||
        require(`./pages/${fileName}/${defaultLanguage}.md`).default;

      fetch(file)
        .then(res => res.text())
        .then(text => setText(text));
    } catch (error) {
      setError(true);
      // eslint-disable-next-line no-console
      console.error('Something went wrong', error);
    }
  }, [fileName, language]);

  const content = useMemo(
    () => (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <ReactMarkdown remarkPlugins={[gfm]}>{text || ''}</ReactMarkdown>
        </div>
      </div>
    ),
    [text]
  );

  if (error) {
    return <Page404 raw />;
  }

  if (raw) {
    return content;
  }

  return <Layout>{content}</Layout>;
};
