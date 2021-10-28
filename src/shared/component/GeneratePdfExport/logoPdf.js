import Logo from 'images/plantao-logo.png';

export default function Index() {
  const logoContent = `  
      <img
        src='${Logo}'
        alt="logo"
        height="49"
        width="300"
      />`;
  return logoContent;
}
