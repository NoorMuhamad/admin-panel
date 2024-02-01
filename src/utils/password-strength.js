
import { Tooltip } from 'antd';
import moment from 'moment';
// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
  if (count < 2) return { label: 'Poor', color: 'error.main' };
  if (count < 3) return { label: 'Weak', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Good', color: 'success.main' };
  if (count < 6) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('user');
  return Boolean(token);
};

export const getAccessToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

export const renderEllipsisTooltip = (text, width) => (
  <Tooltip title={text}>
    <div style={{ width, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
      {text}
    </div>
  </Tooltip>
);


export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};


export const modelTitles = {
  'add': 'Add',
  'edit': 'Edit',
  'view': 'View',
};