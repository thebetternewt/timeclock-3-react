export const GRAY1 = '#0D0E10';
export const GRAY2 = '#1A1818';
export const GRAY3 = '#242424';
export const GRAY4 = 'rgba(63,63,63, 0.23)';
export const GRAY5 = '#353535';
export const LIGHT_GRAY = '#EEEEEE';

export const PRIMARY = '#2980B1';
export const SUCCESS = '#01E7BD';
export const DANGER = '#CE2A2A';

export const getColor = color => {
  switch (color) {
    case 'primary':
      return `
          background: ${PRIMARY};
          color: #fff;
        `;
    case 'success':
      return `
          background: ${SUCCESS};
          color: ${GRAY1};
        `;
    case 'danger':
      return `
          background: ${DANGER};
          color: #fff;
        `;
    default: {
      return `background: #ddd;`;
    }
  }
};
