import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-gutter px-4 md:px-8 lg:px-margin-desktop py-12 md:py-16 max-w-container-max mx-auto">
        <div className="col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <img
              alt="Pytafix Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2XCyFMq2ez6nHxNFn1J0rMFjLFCRkfUehmr4PXwtKLtXdYQggWqKl3Nbx5JHYNAG4OTeYIArtxXVph7OV7OmoKGgZpXnz47UKyqDTWCjKIyWMAOy_dQugLsbd8EK6HnnwqivPu_yvzUIiZYUPwPJ7QpRS0FduXNbag5BYx65GkRmVa2N58MygzXusvYOQcqEySmetOl0EkHLIp4ub8iRBabbGvDDMAltDjMWvsS4ELSIYD6qpRoTfPHXNO5xNGJqq4GSTGYeYti6"
            />
            <span className="font-headline-md text-xl md:text-headline-md font-bold text-primary">
              Pytafix
            </span>
          </Link>
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-6 pr-4">
            Solusi perbaikan hardware terpercaya untuk keberlangsungan digital
            Anda.
          </p>
        </div>
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Kontak
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
              <span>Jl. Elektronik No. 123, Malang Raya</span>
            </li>
            <li className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">schedule</span>
              <span>Mon-Sat 09:00 - 18:00</span>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Sosial Media
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all flex items-center gap-2"
                href="#"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all flex items-center gap-2"
                href="#"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all flex items-center gap-2"
                href="#"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1 flex flex-col justify-end mt-8 lg:mt-0">
          <p className="font-label-sm text-label-sm text-on-surface-variant pt-6 border-t border-outline-variant lg:border-t-0 lg:pt-0">
            © 2024 Pytafix. Part of Pyta Group.
          </p>
        </div>
      </div>
    </footer>
  );
}
