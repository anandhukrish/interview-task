const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto p-5 text-center border px-2 sm:px-0">
        All &copy; copyright reserved {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
