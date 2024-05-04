export interface Theme {
  fontFamily: string;
  colors: {
    background: string;
    text: string;
    hover: string;
    border: string;
  };
  borderRadius: string;
}

export const theme: Theme = {
  fontFamily: 'sans-serif',
  colors: {
    background: '#393e43',
    text: 'white',
    hover: '#43464a',
    border: 'grey',
  },
  borderRadius: '6px',
};
