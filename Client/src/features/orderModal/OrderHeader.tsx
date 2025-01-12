function OrderHeader() {
  return (
    <div
      className="relative flex justify-between  uppercase py-10 px-5 overflow-hidden"
      style={{
        backgroundImage: "url('marbel.jpg')",
      }}
    >
      <div className="flex flex-col">
        <h4 className="text-xl font-bold text-black">You can order now</h4>
        <p>Delight & joy</p>
      </div>
      <div className="absolute right-0 max-w-[300px] ">
        <img
          src="pizza_hero.png"
          alt="Pizza"
          className=" w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default OrderHeader;
