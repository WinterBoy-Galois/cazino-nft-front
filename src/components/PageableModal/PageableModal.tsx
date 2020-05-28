import React, { ReactNode, useReducer, Reducer, useEffect } from 'react';
import { pageableModalReducer, PageableModalState, PageableModalAction } from './lib/reducer';
import Modal from '../Modal';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import styles from './PageableModal.module.scss';
import Footer from './components/Footer';

interface IProps {
  show: boolean;
  pages: ReactNode[];
}

const dynamicChildFactory = (classNames: any) => (child: any) =>
  React.cloneElement(child, {
    classNames,
  });

const PageableModal: React.SFC<IProps> = ({ show, pages }) => {
  const [state, dispatch] = useReducer<Reducer<PageableModalState, PageableModalAction>>(
    pageableModalReducer,
    { activePage: 0, pageCount: 0, direction: 'right' }
  );

  useEffect(() => {
    dispatch({ type: 'INIT_PAGES', payload: { pages } });
  }, [pages]);

  const classNames = {
    enter: styles[`slide-${state.direction}-enter`],
    enterActive: styles[`slide-${state.direction}-enter-active`],
    exit: styles[`slide-${state.direction}-exit`],
    exitActive: styles[`slide-${state.direction}-exit-active`],
  };

  return (
    <Modal
      show={show}
      footer={
        <Footer
          pageCount={state.pageCount}
          activePage={state.activePage}
          onPreviousPage={() => dispatch({ type: 'PREVIOUS_PAGE' })}
          onNextPage={() => dispatch({ type: 'NEXT_PAGE' })}
        />
      }
    >
      <TransitionGroup childFactory={dynamicChildFactory(classNames)} component={null}>
        <SwitchTransition>
          <CSSTransition
            classNames={classNames}
            key={state.activePage}
            timeout={{ enter: 300, exit: 100 }}
          >
            <div style={{ width: '100%' }}>{pages[state.activePage]}</div>
          </CSSTransition>
        </SwitchTransition>
      </TransitionGroup>
    </Modal>
  );
};

export default PageableModal;
