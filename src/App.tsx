function App() {
  return (
    <>
      <div className="grid grid-cols-6 h-screen">
        <div className="bg-red-500 col-span-1 p-2">
          <h1 className="text-white uppercase font-bold">sidebar</h1>
        </div>
        <div className="bg-blue-500 col-span-2 p-4">
          <h1 className="text-white uppercase font-bold">email list</h1>
        </div>
        <div className="bg-green-500 col-span-3 p-4">
          <h1 className="text-white uppercase font-bold">email view</h1>
        </div>
      </div>
    </>
  );
}

export default App;
