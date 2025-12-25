
function Footer() {
  return (
    <footer className="bg-brand-primary text-inverse py-6 w-full z-[1300] mt-auto">
      <div className="max-w-[960px] mx-auto flex flex-row justify-between items-center px-4">
        <span className="text-base">
          © {new Date().getFullYear()} OLX clone. All rights reserved.
        </span>
        <span className="text-sm">
          Powered by OLX Clone
        </span>
      </div>
    </footer>
  );
}

export default Footer;
