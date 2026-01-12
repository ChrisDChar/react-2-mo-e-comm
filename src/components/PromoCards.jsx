import homepodImg from "../assets/HomeImages/homepod.png";
import xiaomiImg from "../assets/HomeImages/xiaomi.png";

const PromoCards = () => {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-8 cursor-pointer">
            <div className="max-w-sm">
              <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded">
                INTRODUCING
              </span>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                New Apple <br /> Homepod Mini
              </h2>

              <p className="mt-3 text-gray-600 text-sm">
                Jam-packed with innovation, HomePod mini delivers unexpectedly.
              </p>

              <button className="mt-6 inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-orange-600 transition cursor-pointer">
                SHOP NOW
                <span>→</span>
              </button>
            </div>

            <img
              src={homepodImg}
              alt="Apple Homepod Mini"
              className="w-40 object-contain"
            />
          </div>

          <div className="relative bg-gray-900 rounded-xl p-8 overflow-hidden flex items-center cursor-pointer">
            <div className="max-w-sm z-10">
              <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded">
                INTRODUCING NEW
              </span>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Xiaomi Mi 11 Ultra <br /> 12GB+256GB
              </h2>

              <p className="mt-3 text-gray-400 text-sm">
                *Data provided by internal laboratories. Industry measurement.
              </p>

              <button className="mt-6 inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-orange-600 transition cursor-pointer">
                SHOP NOW
                <span>→</span>
              </button>
            </div>

            <img
              src={xiaomiImg}
              alt="Xiaomi Mi 11 Ultra"
              className="absolute bottom-0 right-6 w-72 object-contain"
            />

            <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold z-10 cursor-pointer">
              $590
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoCards;
