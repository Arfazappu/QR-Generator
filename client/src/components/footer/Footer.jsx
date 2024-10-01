export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Cryptochecks</h2>
              <p className="text-sm">
                We strive to be a global leader, driving innovation and
                revolutionizing industries through secure, transparent,
                and decentralized solutions. Our vision is to create a
                world where trust, efficiency, and inclusivity are the
                cornerstones of digital interactions.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-4">CONTACT US</h3>
              <p className="text-sm mb-2">
                636-1281 Hornby St. Office #10 Vancouver, B.C. V6Z 0G8,
                Canada
              </p>
              <p className="text-sm mb-2">
                Call Us: <a href="tel:+16047573885" className="hover:text-white">+1 (604) 757 3885</a>
              </p>
              <p className="text-sm">
                <a href="mailto:info@cryptochecks.ca" className="hover:text-white">info@cryptochecks.ca</a>
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-4">SIGN UP FOR EMAIL UPDATES</h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your e-mail address"
                  className="w-3/4 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-1/4 px-2 py-2 bg-[#42B2A4] hover:bg-[#3ba094] text-white text-base font-medium rounded-md transition duration-150 ease-in-out"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs mt-2">
                Sign up with your email address to receive news and updates
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
            <p>Copyright ©2024 Cryptochecks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }