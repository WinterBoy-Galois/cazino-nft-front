import React, { ReactNode, useReducer, Reducer, useEffect, useRef, useState } from 'react';
import { pageableModalReducer, PageableModalState, PageableModalAction } from './lib/reducer';
import Modal from '../Modal';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './PageableModal.module.scss';
import Footer from './components/Footer';

interface IProps {
  show: boolean;
  pages: ReactNode[];
  title?: ReactNode | ReactNode[];
  onClose?: () => void;
  modalClassName?: string;
  activePage?: number;
}

const exitTimeout = 100;

const PageableModal: React.FC<IProps> = ({
  show,
  pages,
  title: initialTitle,
  onClose,
  modalClassName,
  activePage = 0,
}) => {
  const [title, setTitle] = useState<string>();
  const [state, dispatch] = useReducer<Reducer<PageableModalState, PageableModalAction>>(
    pageableModalReducer,
    { activePage: 0, pageCount: 0, direction: 'right' }
  );

  useEffect(() => {
    dispatch({ type: 'INIT_PAGES', payload: { pages, activePage } });
  }, [pages, show, activePage]);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    }, exitTimeout);
  }, [mainRef, state.activePage]);

  useEffect(() => {
    if (Array.isArray(initialTitle)) {
      setTitle(initialTitle[state.activePage] as string);
    } else {
      setTitle(initialTitle as string);
    }
  }, [initialTitle, state.activePage]);

  const classNames = {
    enter: styles[`slide-${state.direction}-enter`],
    enterActive: styles[`slide-${state.direction}-enter-active`],
    exit: styles[`slide-${state.direction}-exit`],
    exitActive: styles[`slide-${state.direction}-exit-active`],
  };

  return (
    <Modal
      show={show}
      title={title}
      mainRef={mainRef}
      onClose={onClose}
      footer={
        <Footer
          pageCount={state.pageCount}
          activePage={state.activePage}
          onPreviousPage={() => dispatch({ type: 'PREVIOUS_PAGE' })}
          onNextPage={() => dispatch({ type: 'NEXT_PAGE' })}
          onGoToPage={page => dispatch({ type: 'GO_TO_PAGE', payload: { page } })}
        />
      }
      modalClassName={modalClassName}
    >
      <SwitchTransition>
        <CSSTransition
          classNames={classNames}
          key={state.activePage}
          timeout={{ enter: 300, exit: exitTimeout }}
        >
          {pages[state.activePage]}
        </CSSTransition>
      </SwitchTransition>
    </Modal>
  );
};

export default PageableModal;
