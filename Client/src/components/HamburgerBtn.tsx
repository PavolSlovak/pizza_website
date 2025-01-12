type HamburgerBtnProps = {
  isOpen: boolean;
  onToggle: () => void;
};
function HamburgerBtn({ isOpen, onToggle }: HamburgerBtnProps) {
  return (
    <button
      className={`sm:hidden ${isOpen ? "hamburger  open  " : "hamburger"}`}
      aria-label="Toggle menu"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log("HamburgerBtn clicked");

        onToggle();
      }}
    >
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
    </button>
  );
}

export default HamburgerBtn;
