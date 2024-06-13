export interface Theme {
  fontFamily: string;
  colors: {
    background: string;
    primary: string;
    primaryHover: string;
    cancel: string;
    cancelHover: string;
    text: string;
    hover: string;
    border: string;
    backgroundBars: string;
  };
  borderRadius: string;
}

export const theme: Theme = {
  fontFamily: 'sans-serif',
  colors: {
    primary: '#393e43',
    primaryHover: '#43464a',
    cancel: '#c9302c',
    cancelHover: '#d9534f',
    background: '#393e43',
    text: 'white',
    hover: '#43464a',
    border: 'grey',
    backgroundBars: '#7F838E',
  },
  borderRadius: '6px',
};
