const Footer = () => {
    return (
      <footer className="w-full bg-black text-gray-400 text-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-center">
            {[
              "About",
              "Help",
              "Press",
              "API",
              "Jobs",
              "Privacy",
              "Terms",
              "Locations",
              "Language",
              "Meta Verified",
            ].map((item, index) => (
              <a key={index} href="#" className="hover:underline">
                {item}
              </a>
            ))}
          </div>
          <div className="text-center mt-4">
            © {new Date().getFullYear()} Uniator
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  