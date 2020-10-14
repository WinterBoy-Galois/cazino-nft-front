export const styles = {
  table: {
    style: {
      backgroundColor: 'transparent',
    },
  },
  header: {
    style: {
      backgroundColor: 'transparent',
    },
  },
  subHeader: {
    style: {
      backgroundColor: 'transparent',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#113352',
      borderBottom: 'none',
      padding: '0 8px',
    },
  },
  headCells: {
    style: {
      textTransform: 'uppercase',
      color: '#6b7a8e',
      fontSize: '15px',
      padding: '16px 8px',
    },
    inactiveSortStyle: {
      '&:focus': {
        color: '#6b7a8e',
      },
      '&:hover': {
        color: '#6b7a8e',
      },
    },
  },
  rows: {
    style: {
      backgroundColor: '#112B46',
      fontSize: '15px',
      color: '#fff',
      '&:not(:last-of-type)': {
        borderBottom: 'none',
      },
      borderRadius: '8px',
      minHeight: '58px',
      '@media screen and (max-width: 768px)': {
        minHeight: '40px',
      },
      padding: '0 8px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    stripedStyle: {
      color: '#fff',
      backgroundColor: '#113352',
      borderRadius: '0',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'transparent',
      color: '#5589FF',
      justifyContent: 'center',
      paddingTop: '16px',
      fontSize: '14px',
      border: 'none',
    },
    pageButtonsStyle: {
      color: '#5589FF',
      fill: '#5589FF',
      borderRadius: 0,
      '&:disabled': {
        color: 'rgba(85,137,255, 0.2)',
        fill: 'rgba(85,137,255, 0.2)',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: 'transparent',
      },
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
  },
  noData: {
    style: {
      color: '#fff',
      backgroundColor: 'transparent',
      minHeight: '300px',
    },
  },
  progress: {
    style: {
      color: '#fff',
      backgroundColor: 'transparent',
      minHeight: '300px',
    },
  },
};
