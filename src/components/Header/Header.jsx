import logoHeader from "../../images/logo-header.svg"
export default function Header() {
  return (  
    <header className="header">
      <img
        className="logo"
        src={logoHeader}
        alt="логотип"
      />
    </header>
  );
}